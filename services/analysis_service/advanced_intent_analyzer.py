import logging
from config import Config

class AdvancedIntentAnalyzer:
    def __init__(self, groq_service):
        self.groq_service = groq_service

    def analyze(self, user_input):
        try:
            advanced_intent_request = self.groq_service.get_client().chat.completions.create(
                messages=[{
                    "role": "system",
                    "content": "Classify the advanced intent detection capabilities based on the following text related to computer hardware. Provide with only one of the following markers in one liner: High-value lead identification or Sales-qualified lead (SQL) potential or Purchase probability scoring or Customer lifecycle stage intent or Technology stack compatibility intent or Personalization readiness."
                },
                {
                    "role": "user",
                    "content": user_input,
                }],
                model=Config.GROQ_MODEL
            )
            advanced_intent = advanced_intent_request.choices[0].message.content
            return advanced_intent.strip()
        except Exception as e:
            logging.error(f"Error analyzing advanced intent: {e}")
            return "High-value lead identification"