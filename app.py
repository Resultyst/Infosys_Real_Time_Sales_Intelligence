from flask import Flask, request, jsonify, render_template
import logging
from services.groq_service import GroqService
from services.analysis_service import (
    SentimentAnalyzer,
    EmotionAnalyzer,
    EngagementAnalyzer,
    PurchaseIntentAnalyzer,
    BehavioralIntentAnalyzer,
    AdvancedIntentAnalyzer
)
from services.suggestion_service import SuggestionService

# Initialize Flask app
app = Flask(__name__)

# Set up basic logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Initialize GroqService
groq_service = GroqService()

# Initialize all analyzers
sentiment_analyzer = SentimentAnalyzer(groq_service)
emotion_analyzer = EmotionAnalyzer(groq_service)
engagement_analyzer = EngagementAnalyzer(groq_service)
purchase_intent_analyzer = PurchaseIntentAnalyzer(groq_service)
behavioral_intent_analyzer = BehavioralIntentAnalyzer(groq_service)
advanced_intent_analyzer = AdvancedIntentAnalyzer(groq_service)

# Initialize SuggestionService
suggestion_service = SuggestionService(groq_service)

@app.route('/')
def index():
    """
    Render the homepage.
    """
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    """
    Handle POST requests to analyze user input and return a response.
    """
    try:
        # Get JSON data from the request
        data = request.get_json()
        user_input = data.get('user_input')

        # If no input is provided, return a default response
        if not user_input:
            return jsonify({
                'response': 'No input received!',
                'sentiment': 'Neutral',
                'emotion': 'Neutral',
                'engagement': 'Moderate',
                'purchase_intent': 'Research-stage intent',
                'behavioral_intent': 'Website browsing intent',
                'advanced_intent': 'High-value lead identification',
                'suggestions': []
            })

        # Perform analysis using the modularized services
        sentiment_response = sentiment_analyzer.analyze(user_input)
        emotion_response = emotion_analyzer.analyze(user_input)
        engagement_response = engagement_analyzer.analyze(user_input)
        purchase_intent_response = purchase_intent_analyzer.analyze(user_input)
        behavioral_intent_response = behavioral_intent_analyzer.analyze(user_input)
        advanced_intent_response = advanced_intent_analyzer.analyze(user_input)
        suggestions_response = suggestion_service.generate_suggestions(user_input)

        # Return the analysis results as JSON
        return jsonify({
            'response': user_input,
            'sentiment': sentiment_response,
            'emotion': emotion_response,
            'engagement': engagement_response,
            'purchase_intent': purchase_intent_response,
            'behavioral_intent': behavioral_intent_response,
            'advanced_intent': advanced_intent_response,
            'suggestions': suggestions_response
        })

    except Exception as e:
        # Log any errors and return a 500 response
        logging.error(f"Error processing request: {e}")
        return jsonify({'response': 'There was an error processing your request. Please try again later.'}), 500

if __name__ == '__main__':
    # Run the Flask app in debug mode
    app.run(debug=True)

# app.py
# from config import Config

# print("Groq API Key:", Config.GROQ_API_KEY)