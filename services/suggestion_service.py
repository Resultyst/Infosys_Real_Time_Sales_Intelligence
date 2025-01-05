import logging
from config import Config


class SuggestionService:
    def __init__(self, groq_service):
        self.groq_service = groq_service

    def generate_suggestions(self, user_input):
        try:
            suggestions_request = self.groq_service.get_client().chat.completions.create(
                messages=[{
                    "role": "system",
                    "content": "Based on the following user input related to computer hardware, provide personalized suggestions. The suggestions should be relevant to the context, such as product recommendations, compatibility checks, or upgrade advice. Keep it concise and relevant."
                },
                {
                    "role": "user",
                    "content": user_input,
                }],
                model=Config.GROQ_MODEL
            )
            suggestions = suggestions_request.choices[0].message.content
            return suggestions.strip()
        except Exception as e:
            logging.error(f"Error generating suggestions: {e}")
            return "Unable to generate suggestions at the moment."