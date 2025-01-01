from flask import Flask, request, jsonify, render_template
from groq import Groq
import logging

app = Flask(__name__)

# Groq client setup
client = Groq(api_key='#####################')

# Set up basic logging for debugging
logging.basicConfig(level=logging.DEBUG)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    try:
        data = request.get_json()
        user_input = data.get('user_input')

        if not user_input:
            return jsonify({
                'response': 'No input received!',
                'sentiment': 'Neutral',
                'emotion': 'Neutral',
                'purchase_intent': 'Research-stage intent',
                'behavioral_intent': 'Website browsing intent',
                'advanced_intent': 'High-value lead identification',
                'suggestions': []
            })

        # Step 1: Sentiment analysis
        sentiment_response = analyze_sentiment(user_input)

        # Step 2: Emotional state detection
        emotion_response = analyze_emotion(user_input)

        # Step 3: Buyer engagement analysis
        engagement_response = analyze_engagement(user_input)

        # Step 4: Purchase intent analysis
        purchase_intent_response = analyze_purchase_intent(user_input)

        # Step 5: Behavioral intent signals analysis
        behavioral_intent_response = analyze_behavioral_intent(user_input)

        # Step 6: Advanced intent detection capabilities
        advanced_intent_response = analyze_advanced_intent(user_input)

        # Step 7: Generate suggestions using Groq API
        suggestions_response = generate_suggestions(user_input)

        # Return all responses
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
        logging.error(f"Error processing request: {e}")
        return jsonify({'response': 'There was an error processing your request. Please try again later.'})

def generate_suggestions(user_input):
    """
    Generate suggestions based on the user input using Groq API.
    """
    suggestions_request = client.chat.completions.create(
        messages=[{
            "role": "system",
            "content": "Based on the following user input, provide personalized suggestions. The suggestions should be relevant to the context, such as product recommendations, assistance offers, or next steps. Keep it concise and relevant."
        },
        {
            "role": "user",
            "content": user_input,
        }],
        model="mixtral-8x7b-32768"
    )
    suggestions = suggestions_request.choices[0].message.content
    return suggestions.strip()

def analyze_sentiment(user_input):
    sentiment_request = client.chat.completions.create(
        messages=[{
            "role": "system",
            "content": "Classify the sentiment of the following text. Provide only the sentiment category in one liner: Positive, Negative, Neutral, Very Positive, Very Negative."
        },
        {
            "role": "user",
            "content": user_input,
        }],
        model="mixtral-8x7b-32768"
    )
    sentiment = sentiment_request.choices[0].message.content
    return sentiment.strip()


def analyze_emotion(user_input):
    emotion_request = client.chat.completions.create(
        messages=[{
            "role": "system",
            "content": "Analyze the emotional state based on the following text. Provide only with one of the following emotions with one liner: Excitement or Frustration or Confusion or Hesitation or Satisfaction or Dissatisfaction or Curiosity or Skepticism."
        },
        {
            "role": "user",
            "content": user_input,
        }],
        model="mixtral-8x7b-32768"
    )
    emotion = emotion_request.choices[0].message.content
    return emotion.strip()

def analyze_engagement(user_input):
    engagement_request = client.chat.completions.create(
        messages=[{
            "role": "system",
            "content": "Assess the level of buyer engagement based on the following text. Provide only with one of the following levels in one liner: Low or Moderate or High."
        },
        {
            "role": "user",
            "content": user_input,
        }],
        model="mixtral-8x7b-32768"
    )
    engagement = engagement_request.choices[0].message.content
    return engagement.strip()

def analyze_purchase_intent(user_input):
    """
    Analyze the purchase intent category based on the user input.
    """
    purchase_intent_request = client.chat.completions.create(
        messages=[{
            "role": "system",
            "content": "Classify the purchase intent of the following text. Provide with only one of the following categories in one liner: Immediate purchase intent or Exploratory purchase intent or Comparative shopping intent or Upgrade/replacement intent or Research-stage intent or Price comparison intent."
        },
        {
            "role": "user",
            "content": user_input,
        }],
        model="mixtral-8x7b-32768"
    )
    purchase_intent = purchase_intent_request.choices[0].message.content
    return purchase_intent.strip()

def analyze_behavioral_intent(user_input):
    """
    Analyze the behavioral intent signals based on the user input.
    """
    behavioral_intent_request = client.chat.completions.create(
        messages=[{
            "role": "system",
            "content": "Classify the behavioral intent signals of the following text. Provide with only one of the following signals in one liner: Website browsing intent or Product page exploration or Content download intent or Pricing page investigation or Cart abandonment signals or Repeated product view intent."
        },
        {
            "role": "user",
            "content": user_input,
        }],
        model="mixtral-8x7b-32768"
    )
    behavioral_intent = behavioral_intent_request.choices[0].message.content
    return behavioral_intent.strip()

def analyze_advanced_intent(user_input):
    """
    Analyze advanced intent detection capabilities based on the user input.
    """
    advanced_intent_request = client.chat.completions.create(
        messages=[{
            "role": "system",
            "content": "Classify the advanced intent detection capabilities based on the following text. Provide with only one of the following markers in one liner: High-value lead identification or Sales-qualified lead (SQL) potential or Purchase probability scoring or Customer lifecycle stage intent or Technology stack compatibility intent or Personalization readiness."
        },
        {
            "role": "user",
            "content": user_input,
        }],
        model="mixtral-8x7b-32768"
    )
    advanced_intent = advanced_intent_request.choices[0].message.content
    return advanced_intent.strip()

if __name__ == '__main__':
    app.run(debug=True)
