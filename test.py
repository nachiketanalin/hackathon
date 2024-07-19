# # from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

# # model_name = "unitary/toxic-bert"
# # tokenizer = AutoTokenizer.from_pretrained(model_name)
# # model = AutoModelForSequenceClassification.from_pretrained(model_name)


# # toxicity_pipeline = pipeline("text-classification", model=model, tokenizer=tokenizer)
# # def is_socially_acceptable(text):
# #     result = toxicity_pipeline(text)
# #     for label in result:
# #         if label['label'] in ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"] and label['score'] > 0.5:
# #             return False
# #     return True

# # texts = [
# #     "You are an amazing person!",
# #     "This is a disgusting and hateful comment.",
# #     "Let's talk about inappropriate things."
# # ]

# # for text in texts:
# #     print(f"Text: {text}")
# #     print(f"Socially Acceptable: {is_socially_acceptable(text)}")
# from transformers import BertTokenizer, BertForSequenceClassification, BertForMaskedLM
# import torch

# class DementiaChatbot:
#     def __init__(self):
#         # Initialize the tokenizer and models
#         self.tokenizer = BertTokenizer.from_pretrained('bert-large-uncased')
#         self.model = BertForMaskedLM.from_pretrained('bert-large-uncased')

#     def generate_response(self, input_text):
#         # Encode the input text
#         input_ids = self.tokenizer.encode(input_text, return_tensors='pt')

#         # Generate a response
#         with torch.no_grad():
#             outputs = self.model.generate(input_ids, max_length=150, num_return_sequences=1, pad_token_id=self.tokenizer.eos_token_id)
        
#         # Decode the response
#         response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
#         return response

#     def chat(self):
#         print("Dementia Chatbot: Hello! How can I assist you today?")
#         while True:
#             user_input = input("You: ")
#             if user_input.lower() in ["exit", "quit", "bye"]:
#                 print("Dementia Chatbot: Goodbye!")
#                 break
            
#             response = self.generate_response(user_input)
#             print(f"Dementia Chatbot: {response}")

# if __name__ == "__main__":
#     chatbot = DementiaChatbot()
#     chatbot.chat()
