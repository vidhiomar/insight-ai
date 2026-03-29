from transformers import pipeline

model = None

def generate_summary(text):
    global model

    if not text:        
        return {"summary": "No input provided"}

    if model is None:
        model = pipeline(
            "text2text-generation",
            model="facebook/bart-large-cnn"
        )
    
    

        result = model(text, max_length=130, min_length=30, truncation=True)
    return {
        "summary": result[0]["generated_text"]
    }
    