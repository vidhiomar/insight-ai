import logging
import os
import re
import time
from functools import lru_cache
from pathlib import Path
from typing import Any

import httpx
import torch
from fastapi import HTTPException
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

from app.config import get_supported_models


logger = logging.getLogger(__name__)

DEFAULT_MODEL_ID = "facebook/bart-large-cnn"
DEFAULT_SUMMARY_TYPE = "short"
HF_API_URL_TEMPLATE = "https://router.huggingface.co/hf-inference/models/{model_id}"
SUMMARY_LENGTHS = {
    "short": {"max_new_tokens": 80, "min_new_tokens": 25},
    "medium": {"max_new_tokens": 160, "min_new_tokens": 60},
    "long": {"max_new_tokens": 260, "min_new_tokens": 120},
    "bullet": {"max_new_tokens": 180, "min_new_tokens": 70},
    "key": {"max_new_tokens": 180, "min_new_tokens": 70},
}
SUMMARY_TYPE_ALIASES = {
    "short": "short",
    "detailed": "medium",
    "medium": "medium",
    "bullets": "bullet",
    "bullet": "bullet",
    "insights": "key",
    "key": "key",
    "long": "long",
}


def _truncate_for_logs(value: Any, limit: int = 300) -> str:
    text = str(value)
    return text if len(text) <= limit else f"{text[:limit]}..."


def _normalize_output_text(text: str) -> str:
    return re.sub(r"\s+", " ", text.replace("<n>", " ").strip())


def _get_huggingface_token() -> str:
    return (
        os.getenv("HUGGINGFACE_API_KEY")
        or
        os.getenv("HUGGINGFACE_API_TOKEN")
        or os.getenv("HF_TOKEN")
        or os.getenv("HUGGINGFACEHUB_API_TOKEN")
        or ""
    )


def _normalize_summary_type(summary_type: str | None) -> str:
    if not summary_type:
        return DEFAULT_SUMMARY_TYPE

    return SUMMARY_TYPE_ALIASES.get(summary_type.lower(), DEFAULT_SUMMARY_TYPE)


def _resolve_model(model_id: str | None) -> dict[str, Any]:
    supported_models = get_supported_models()
    resolved_model_id = model_id or DEFAULT_MODEL_ID

    if resolved_model_id not in supported_models:
        raise HTTPException(
            status_code=400,
            detail={
                "message": f"Unsupported model '{resolved_model_id}'.",
                "supported_models": list(supported_models.keys()),
            },
        )

    return supported_models[resolved_model_id]


def _convert_to_bullets(text: str) -> str:
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    bullets = [f"- {sentence.strip()}" for sentence in sentences if sentence.strip()]
    return "\n".join(bullets) if bullets else text


def _format_model_input(model: dict[str, Any], text: str, summary_type: str) -> str:
    normalized_text = text.strip()
    model_id = model.get("providerModelId", model["id"]).lower()

    instructions = {
        "short": "Summarize the following text concisely.",
        "medium": "Provide a clear summary of the following text.",
        "long": "Provide a detailed summary of the following text.",
        "bullet": "Summarize the following text as bullet points.",
        "key": "Extract the key insights from the following text as bullet points.",
    }

    if model["task"] in {"text-generation", "chat-completion"}:
        return f"<s>[INST] {instructions[summary_type]}\n\n{normalized_text} [/INST]"

    if model["task"] == "text2text-generation" and "t5" in model_id:
        return f"summarize: {normalized_text}"

    return normalized_text


def _resolve_local_snapshot_path(model: dict[str, Any]) -> Path | None:
    cache_path = Path(model["cachePath"])
    if not cache_path.exists():
        return None

    refs_main = cache_path / "refs" / "main"
    if refs_main.exists():
        revision = refs_main.read_text(encoding="utf-8").strip()
        snapshot_path = cache_path / "snapshots" / revision
        if snapshot_path.exists():
            return snapshot_path

    snapshot_root = cache_path / "snapshots"
    snapshot_dirs = sorted(
        [path for path in snapshot_root.iterdir() if path.is_dir()],
        key=lambda path: path.stat().st_mtime,
        reverse=True,
    )
    if snapshot_dirs:
        return snapshot_dirs[0]

    return None


@lru_cache(maxsize=2)
def _get_local_seq2seq_components(model_source: str, local_files_only: bool):
    device = "cuda" if torch.cuda.is_available() else "cpu"
    tokenizer = AutoTokenizer.from_pretrained(model_source, local_files_only=local_files_only)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_source, local_files_only=local_files_only).to(device)
    if getattr(model.generation_config, "forced_bos_token_id", None) is None:
        model.generation_config.forced_bos_token_id = 0
    return tokenizer, model, device


def _generate_local_summary(model: dict[str, Any], formatted_input: str, summary_type: str) -> str:
    model_path = _resolve_local_snapshot_path(model)
    if model_path is None:
        logger.info("local_model_cache_miss model=%s action=download_on_first_run", model["id"])
        model_source = model["id"]
        local_files_only = False
    else:
        model_source = str(model_path)
        local_files_only = True

    tokenizer, seq2seq_model, device = _get_local_seq2seq_components(model_source, local_files_only)
    length_config = SUMMARY_LENGTHS[summary_type]

    inputs = tokenizer(
        formatted_input,
        max_length=1024,
        truncation=True,
        return_tensors="pt",
    ).to(device)

    input_token_count = inputs["input_ids"].shape[1]
    adjusted_min_new_tokens = min(length_config["min_new_tokens"], max(8, input_token_count // 3))

    output_ids = seq2seq_model.generate(
        **inputs,
        max_new_tokens=length_config["max_new_tokens"],
        min_new_tokens=adjusted_min_new_tokens,
        do_sample=False,
        num_beams=4,
        early_stopping=True,
        no_repeat_ngram_size=3,
    )
    raw_output = tokenizer.decode(output_ids[0], skip_special_tokens=True).strip()
    logger.info("local_model_raw_output model=%s raw=%s", model["id"], _truncate_for_logs(raw_output))
    return raw_output


def _build_seq2seq_parameters(formatted_input: str, summary_type: str) -> dict[str, int | bool]:
    length_config = SUMMARY_LENGTHS[summary_type]
    input_word_count = max(1, len(formatted_input.split()))

    safe_min_length = min(length_config["min_new_tokens"], max(5, input_word_count // 4))
    safe_max_length = min(length_config["max_new_tokens"], max(safe_min_length + 8, input_word_count // 2 + 24))

    return {
        "max_length": safe_max_length,
        "min_length": safe_min_length,
        "do_sample": False,
        "truncation": True,
    }


def _build_payload(model: dict[str, Any], formatted_input: str, summary_type: str) -> dict[str, Any]:
    length_config = SUMMARY_LENGTHS[summary_type]

    if model["task"] == "chat-completion":
        return {
            "model": model.get("providerModelId", model["id"]),
            "messages": [
                {"role": "user", "content": formatted_input}
            ],
            "max_tokens": length_config["max_new_tokens"],
            "temperature": 0.1,
        }

    if model["task"] == "text-generation":
        return {
            "inputs": formatted_input,
            "parameters": {
                "max_new_tokens": length_config["max_new_tokens"],
                "min_new_tokens": min(length_config["min_new_tokens"], 40),
                "return_full_text": False,
                "do_sample": False,
                "temperature": 0.1,
            },
            "options": {"wait_for_model": True},
        }

    return {
        "inputs": formatted_input,
        "parameters": _build_seq2seq_parameters(formatted_input, summary_type),
        "options": {"wait_for_model": True},
    }


def _extract_summary(response_data: Any) -> str:
    if isinstance(response_data, dict) and "choices" in response_data:
        choices = response_data.get("choices") or []
        if choices and isinstance(choices[0], dict):
            message = choices[0].get("message") or {}
            return message.get("content") or ""

    if isinstance(response_data, list) and response_data:
        first_item = response_data[0]
        if isinstance(first_item, dict):
            return (
                first_item.get("summary_text")
                or first_item.get("generated_text")
                or first_item.get("translation_text")
                or first_item.get("text")
                or ""
            )
        if isinstance(first_item, str):
            return first_item

    if isinstance(response_data, dict):
        if response_data.get("error"):
            raise HTTPException(status_code=502, detail=response_data["error"])

        return (
            response_data.get("summary_text")
            or response_data.get("generated_text")
            or response_data.get("text")
            or response_data.get("answer")
            or ""
        )

    return ""


def _validate_model_output(model: dict[str, Any], response_data: Any, summary: str) -> None:
    if model["id"] in {"t5-base", "google-t5/t5-base"} and isinstance(response_data, list) and response_data:
        first_item = response_data[0]
        if isinstance(first_item, dict) and first_item.get("translation_text"):
            raise HTTPException(
                status_code=502,
                detail=(
                    "The Hugging Face router output for t5-base is a translation, not a summary. "
                    "The exact model 't5-base' is not producing valid summarization output via this API path."
                ),
            )


def _post_to_huggingface(model: dict[str, Any], payload: dict[str, Any]) -> Any:
    token = _get_huggingface_token()
    if not token:
        raise HTTPException(
            status_code=500,
            detail="Missing Hugging Face API token. Set HUGGINGFACE_API_TOKEN before starting the backend for Mistral, T5, and Pegasus.",
        )

    headers = {"Authorization": f"Bearer {token}"}
    provider_model_id = model.get("providerModelId", model["id"])
    if model["task"] == "chat-completion":
        url = "https://router.huggingface.co/v1/chat/completions"
    else:
        url = HF_API_URL_TEMPLATE.format(model_id=provider_model_id)

    try:
        response = httpx.post(url, headers=headers, json=payload, timeout=120.0)
        response.raise_for_status()
    except httpx.HTTPStatusError as exc:
        detail = exc.response.text
        logger.error("huggingface_http_status_error model=%s provider_model=%s detail=%s", model["id"], provider_model_id, detail)
        if exc.response.status_code == 404:
            raise HTTPException(
                status_code=502,
                detail=f"Hugging Face router does not expose provider model '{provider_model_id}' for app model '{model['id']}'.",
            ) from exc
        if exc.response.status_code == 400 and "not supported by any provider" in detail:
            raise HTTPException(
                status_code=502,
                detail=f"Hugging Face router does not support '{provider_model_id}' for your enabled providers.",
            ) from exc
        raise HTTPException(status_code=502, detail=f"Hugging Face request failed: {detail}") from exc
    except httpx.HTTPError as exc:
        logger.exception("huggingface_http_error model=%s", model["id"])
        raise HTTPException(status_code=502, detail=f"Unable to reach Hugging Face: {exc}") from exc

    response_data = response.json()
    logger.info("remote_model_raw_output model=%s raw=%s", model["id"], _truncate_for_logs(response_data))
    return response_data


def summarize_text(text: str, summary_type: str | None = None, model_id: str | None = None) -> dict[str, Any]:
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Text is required.")

    normalized_summary_type = _normalize_summary_type(summary_type)
    model = _resolve_model(model_id)
    formatted_input = _format_model_input(model, text, normalized_summary_type)

    logger.info(
        "summarize_request model=%s provider=%s summary_type=%s input_chars=%s formatted_input=%s",
        model["id"],
        model["provider"],
        normalized_summary_type,
        len(text),
        _truncate_for_logs(formatted_input),
    )

    started_at = time.perf_counter()
    try:
        if model["provider"] == "local_transformers":
            summary = _generate_local_summary(model, formatted_input, normalized_summary_type).strip()
        else:
            payload = _build_payload(model, formatted_input, normalized_summary_type)
            response_data = _post_to_huggingface(model, payload)
            summary = _extract_summary(response_data).strip()
            _validate_model_output(model, response_data, summary)
    except HTTPException as exc:
        logger.error("summarize_http_exception model=%s detail=%s", model["id"], exc.detail)
        raise
    except Exception as exc:
        logger.exception("summarize_unhandled_exception model=%s", model["id"])
        raise HTTPException(status_code=500, detail=f"Unexpected inference error for {model['id']}: {exc}") from exc

    duration = round(time.perf_counter() - started_at, 2)

    if normalized_summary_type in {"bullet", "key"}:
        summary = _convert_to_bullets(summary)
    else:
        summary = _normalize_output_text(summary)

    if not summary:
        logger.error("empty_summary model=%s", model["id"])
        raise HTTPException(status_code=502, detail="Model response did not contain a summary.")

    formatted_response = {
        "summary": summary,
        "model": model["id"],
        "summary_type": normalized_summary_type,
        "processing_time": duration,
    }
    logger.info("summarize_response model=%s response=%s", model["id"], _truncate_for_logs(formatted_response))
    return formatted_response


def compare_models(text: str, summary_type: str | None = None) -> dict[str, Any]:
    supported_models = get_supported_models()
    comparisons = {}

    for model_id in supported_models:
        try:
            result = summarize_text(text=text, summary_type=summary_type, model_id=model_id)
            comparisons[model_id] = {
                "text": result["summary"],
                "time": result["processing_time"],
                "model": result["model"],
                "summary_type": result["summary_type"],
            }
        except HTTPException as exc:
            detail = exc.detail["message"] if isinstance(exc.detail, dict) and "message" in exc.detail else str(exc.detail)
            logger.error("compare_model_failure model=%s detail=%s", model_id, detail)
            comparisons[model_id] = {
                "text": f"Unable to summarize with {model_id}: {detail}",
                "time": None,
                "model": model_id,
                "summary_type": _normalize_summary_type(summary_type),
            }

    logger.info("compare_response response=%s", _truncate_for_logs(comparisons))
    return comparisons
