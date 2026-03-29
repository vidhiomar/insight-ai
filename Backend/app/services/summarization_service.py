from app.models.bart import generate_summary

def summarize_text(text: str):
    return generate_summary(text)

def compare_models(text):
    return {
        "bart": "summary from BART",
        "t5": "summary from T5"
    }