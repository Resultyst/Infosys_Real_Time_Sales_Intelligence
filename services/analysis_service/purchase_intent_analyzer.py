import logging
from config import Config


class PurchaseIntentAnalyzer:
    def __init__(self, groq_service):
        self.groq_service = groq_service

    def analyze(self, user_input):
        try:
            purchase_intent_request = self.groq_service.get_client().chat.completions.create(
                messages=[{
                    "role": "system",
                    "content": "Classify the purchase intent of the following text related to computer hardware. Provide with only one of the following categories in one liner: Immediate purchase intent or Exploratory purchase intent or Comparative shopping intent or Upgrade/replacement intent or Research-stage intent or Price comparison intent."
                },
                {
                    "role": "user",
                    "content": user_input,
                }],
                model=Config.GROQ_MODEL
            )
            purchase_intent = purchase_intent_request.choices[0].message.content
            return purchase_intent.strip()
        except Exception as e:
            logging.error(f"Error analyzing purchase intent: {e}")
            return "Research-stage intent"