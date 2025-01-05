import logging
from config import Config

class BehavioralIntentAnalyzer:
    def __init__(self, groq_service):
        self.groq_service = groq_service

    def analyze(self, user_input):
        try:
            behavioral_intent_request = self.groq_service.get_client().chat.completions.create(
                messages=[{
                    "role": "system",
                    "content": "Classify the behavioral intent signals of the following text related to computer hardware. Provide with only one of the following signals in one liner: Website browsing intent or Product page exploration or Content download intent or Pricing page investigation or Cart abandonment signals or Repeated product view intent."
                },
                {
                    "role": "user",
                    "content": user_input,
                }],
                model=Config.GROQ_MODEL
            )
            behavioral_intent = behavioral_intent_request.choices[0].message.content
            return behavioral_intent.strip()
        except Exception as e:
            logging.error(f"Error analyzing behavioral intent: {e}")
            return "Website browsing intent"