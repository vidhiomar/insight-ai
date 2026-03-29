from app.models.bart import generate_summary

def summarize_text(text , summary_type):
    return generate_summary(text , summary_type)

def compare_models(text):
    return {
        "bart": "summary from BART",
        "t5": "summary from T5"
    }