from transformers import pipeline
import torch
import re

model = None


def convert_to_bullets(text):
    sentences = re.split(r'(?<=[.!?]) +', text)

    bullets = []
    for s in sentences:
        s = s.strip()
        if s:
            bullets.append(f"• {s}")

    return "\n".join(bullets)


def generate_summary(text, summary_type="short"):
    global model 

    if not text:
        return {"summary": "No input provided"}

    try:
        if model is None:
            device = 0 if torch.cuda.is_available() else -1

            model = pipeline(
                "text2text-generation",
                model="facebook/bart-large-cnn",
                device=device
            )

        summary_type = summary_type.lower()

       
        if summary_type == "short":
            prompt = "Summarize this in a short concise way:\n" + text
            max_len, min_len = 80 , 25

        elif summary_type == "medium":
            prompt = "Provide a detailed summary of the following text:\n" + text
            max_len, min_len = 200, 80

        elif summary_type == "long":
            prompt = "Summarize this text in detail covering all key points:\n" + text
            max_len, min_len = 300, 120

        elif summary_type == "bullet":
            prompt = "Summarize this text into bullet points:\n" + text
            max_len, min_len = 180, 60

        elif summary_type == "key":
            prompt = "Extract key insights from this text:\n" + text
            max_len, min_len = 180, 60

        else:
            prompt = text
            max_len, min_len = 130, 40

        # ✅ Model call
        result = model(
        prompt[:1000],
        max_length=max_len,
        min_length=min_len,
        truncation=True,
        length_penalty=2.0 if summary_type == "short" else 1.0
        )

        summary_text = result[0]["generated_text"]

        
        if summary_type in ["bullet", "key"]:
            summary_text = convert_to_bullets(summary_text)

        return {"summary": summary_text}

    except Exception as e:
        print("ERROR:", str(e))
        return {"summary": "Error generating summary"}