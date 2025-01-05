import logging
from config import Config


class SentimentAnalyzer:
    def __init__(self, groq_service):
        self.groq_service = groq_service

    def analyze(self, user_input):
        try:
            sentiment_request = self.groq_service.get_client().chat.completions.create(
                messages=[{
                    "role": "system",
                    "content": "Classify the sentiment of the following text related to computer hardware. Provide only the sentiment category in one liner: Positive, Negative, Neutral, Very Positive, Very Negative."
                },
                {
                    "role": "user",
                    "content": user_input,
                }],
                model=Config.GROQ_MODEL
            )
            sentiment = sentiment_request.choices[0].message.content
            return sentiment.strip()
        except Exception as e:
            logging.error(f"Error analyzing sentiment: {e}")
            return "Neutral"