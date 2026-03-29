def format_bullets(text):
    sentences = text.split(". ")
    bullets = [f"• {s.strip()}" for s in sentences if s]
    return {"summary": bullets}


def extract_insights(text):
    sentences = text.split(". ")
    insights = sentences[:3]  # top 3 lines
    return {"summary": insights}