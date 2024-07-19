from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

model_name = "unitary/toxic-bert"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)


toxicity_pipeline = pipeline("text-classification", model=model, tokenizer=tokenizer)
def is_socially_acceptable(text):
    result = toxicity_pipeline(text)
    for label in result:
        if label['label'] in ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"] and label['score'] > 0.5:
            return False
    return True

texts = [
    "You are an amazing person!",
    "This is a disgusting and hateful comment.",
    "Let's talk about inappropriate things."
]

for text in texts:
    print(f"Text: {text}")
    print(f"Socially Acceptable: {is_socially_acceptable(text)}")