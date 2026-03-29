def generate_summary(text, summary_type="short"):
    global model

    if not text:
        return {"summary": "No input provided"}

    try:
        if model is None:
            import torch
            device = 0 if torch.cuda.is_available() else -1

            model = pipeline(
                "text2text-generation",
                model="facebook/bart-large-cnn",
                device=device
            )

        summary_type = summary_type.lower()

        if summary_type == "short":
            max_len, min_len = 100, 30
        elif summary_type == "medium":
            max_len, min_len = 150, 60
        elif summary_type in ["long", "bullet", "key"]:
            max_len, min_len = 220, 80
        else:
            max_len, min_len = 130, 40

        result = model(
            text,
            max_length=max_len,
            min_length=min_len,
            truncation=True
        )

        summary_text = result[0]["generated_text"]

        #bullet formatting
        if summary_type in ["bullet", "key"]:
            summary_text = convert_to_bullets(summary_text)

        return {"summary": summary_text}

    except Exception as e:
        print("ERROR:", str(e))
        return {"summary": "Error generating summary"}