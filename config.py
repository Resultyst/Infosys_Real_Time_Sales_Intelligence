import os
from dotenv import load_dotenv

# Load environment variables

load_dotenv(override=True)

class Config:
    GROQ_API_KEY = os.getenv('GROQ_API_KEY')
    GROQ_MODEL = "mixtral-8x7b-32768"