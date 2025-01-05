import logging
from config import Config


class EmotionAnalyzer:
    def __init__(self, groq_service):
        self.groq_service = groq_service

    def analyze(self, user_input):
        try:
            emotion_request = self.groq_service.get_client().chat.completions.create(
                messages=[{
                    "role": "system",
                    "content": "Analyze the emotional state based on the following text related to computer hardware. Provide only with one of the following emotions with one liner: Excitement or Frustration or Confusion or Hesitation or Satisfaction or Dissatisfaction or Curiosity or Skepticism."
                },
                {
                    "role": "user",
                    "content": user_input,
                }],
                model=Config.GROQ_MODEL
            )
            emotion = emotion_request.choices[0].message.content
            return emotion.strip()
        except Exception as e:
            logging.error(f"Error analyzing emotion: {e}")
            return "Neutral"