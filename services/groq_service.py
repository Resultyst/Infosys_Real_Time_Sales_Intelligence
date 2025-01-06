# groq_service.py
from groq import Groq
from config import Config

class GroqService:
    def __init__(self):
        print("Groq API Key:", Config.GROQ_API_KEY) 
        self.client = Groq(api_key=Config.GROQ_API_KEY)

    def get_client(self):
        return self.client
