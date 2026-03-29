import json
from functools import lru_cache
from pathlib import Path


MODELS_CONFIG_PATH = Path(__file__).resolve().parents[2] / "Frontend" / "src" / "config" / "models.json"


@lru_cache(maxsize=1)
def get_supported_models():
    with MODELS_CONFIG_PATH.open("r", encoding="utf-8") as models_file:
        models = json.load(models_file)

    return {model["id"]: model for model in models}
