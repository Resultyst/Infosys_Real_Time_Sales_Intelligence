import logging
from config import Config


class EngagementAnalyzer:
    def __init__(self, groq_service):
        self.groq_service = groq_service

    def analyze(self, user_input):
        try:
            engagement_request = self.groq_service.get_client().chat.completions.create(
                messages=[{
                    "role": "system",
                    "content": "Assess the level of buyer engagement based on the following text related to computer hardware. Provide only with one of the following levels in one liner: Low or Moderate or High."
                },
                {
                    "role": "user",
                    "content": user_input,
                }],
                model=Config.GROQ_MODEL
            )
            engagement = engagement_request.choices[0].message.content
            return engagement.strip()
        except Exception as e:
            logging.error(f"Error analyzing engagement: {e}")
            return "Moderate"