from transformers import pipeline

model = None

def generate_summary(text):
    global model

    if model is None:
        model = pipeline(
            "text2text-generation",
            model="google/pegasus-xsum"
        )

    result = model(text)

    return {"summary": result[0]["generated_text"]}
