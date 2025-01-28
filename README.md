# Real-Time AI Sales Intelligence and Sentiment-Driven Deal Negotiation Assistant

![Project Banner](assets/banner.png)

Real-Time AI Sales Intelligence and Sentiment-Driven Deal Negotiation Assistant aims to transform the sales process by developing an AI-powered assistant that provides real-time sentiment analysis, intent detection, personalized recommendations, and negotiation coaching. 

It reduces manual effort, improves customer engagement, and optimizes the sales workflow. 

## Features

- **Sentiment Analysis**: Understand user sentiment (e.g., Positive, Negative, Neutral).
- **Emotion Detection**: Identify user emotions such as Excitement, Frustration, or Confusion.
- **Purchase Intent Analysis**: Classify the urgency and intent of a user (e.g., Immediate, Exploratory, or Comparative).
- **Behavioral Insights**: Analyze user browsing patterns and behavioral signals.
- **Advanced Intent Detection**: Pinpoint high-value and sales-qualified leads.
- **Personalized Recommendations**: Offer customized product suggestions based on user preferences.
- **CRM Integration**: Track user interactions and history for a personalized experience.
- **Post-Call Insights**: Generate actionable summaries, analytics, and follow-up suggestions.
- **Negotiation Coaching**: Provide negotiation strategies and objection-handling tips.
- **Google Sheets Integration**: Automatically log analytics into Google Sheets for tracking and analysis.
- **Real-Time Speech Recognition**: Captures user speech during sales calls and provides real-time insights.
- **Dashboard Visualization**: Displays real-time sentiment, emotion, engagement, and other metrics during the call.
- **Transcription & Analysis Export**: Saves call transcriptions and analysis results to an Excel file for further review.
- **Feedback Mechanism**: Allows users to provide feedback (thumbs_up or thumbs_down) on recommendations, which improves future suggestions.

## Demo

<!-- Add a GIF or video demo of your project in action -->

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Documentation](#api-documentation)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Installation

### Prerequisites

- Python 3.x
- Groq API Key (Sign up at [Groq](https://www.groq.com))
- Google Sheets & Drive API (Enable at[Google Cloud Console](https://console.cloud.google.com))

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/Resultyst/Infosys_Real_Time_Sales_Intelligence.git
    cd Infosys_Real_Time_Sales_Intelligence
    ```

2. Set up the backend:

    ```bash
    pip install -r requirements.txt
    ```

3. Set up the frontend:

     Serve the `index.html` file.

4. Set environment variables:

     Create a Groq API key and save it in config.py file and choose your preferred LLM model(Mixtral, Llama etc.,.)

      ```env
      # Groq API Key
      GROQ_API_KEY=your_groq_api_key_here

      # LLM Model
      LLM_MODEL = "any open source llm model"  
      ```

5. Run the Application:

    ```bash
    uvicorn app.main:app --reload
    ```

6. Open the application in your browser:

    ```
    http://127.0.0.1:8000
    ```

## Usage

### Step-by-Step Guide

1. Open the Application:

    Ensure you are using an audio-supported browser (e.g., Chrome, Firefox).
    
    Navigate to the application URL (http://127.0.0.1:8000).

2. Start the Application:

    Click the microphone button (green button) to begin speech recognition. This simulates attending a sales call.

3. Speak into the Microphone:

    Speak naturally into the microphone as if you are having a sales conversation with a customer.
    
    The application will capture your speech in real-time and process it for insights.

4. View Real-Time Insights:

    As you speak, the Sales View Dashboard will display real-time insights, including:
    
    Sentiment: Positive, Negative, Neutral, etc.
    
    Emotion: Excitement, Frustration, Confusion, etc.
    
    Engagement: Low, Moderate, High.
    
    Purchase Intent: Immediate, Exploratory, Comparative, etc.
    
    Behavioral Intent: Website browsing, Product page exploration, etc.
    
    Advanced Intent: High-value lead identification, Sales-qualified lead potential, etc.
   
5. Provide Feedback:

    After receiving product recommendations, you can provide feedback using the thumbs_up or thumbs_down buttons.
    
    Thumbs Up: Indicates satisfaction with the recommendations. The system will prioritize similar products in the future.
    
    Thumbs Down: Indicates dissatisfaction. The system will adjust its recommendations by broadening the search or shuffling results.

6. Stop the Recording:

    Click the Stop Recording button to end the session.
    
    The application will finalize the transcription and analysis.

7. Save the Results:

    After stopping the recording, you can save the transcription and analysis results to an Excel file for further review.
    
    The Excel file will include:
    
    Full call transcription.
    
    Sentiment, emotion, and intent analysis.
    
    Product recommendations (if applicable).
    
    Performance analytics and follow-up suggestions.
   
### Example Workflow

1. Start a Call:

    Click the microphone button to begin.
    
    Say: "Hi, I'm looking for a new smartphone with a good camera. My budget is around ₹30,000."

2. Real-Time Insights:

    The dashboard updates in real-time:
    
    Sentiment: Positive
    
    Emotion: Curiosity
    
    Purchase Intent: Immediate purchase intent
    
    Behavioral Intent: Product page exploration
    
    Advanced Intent: High-value lead identification

3. Product Recommendations:

    The system suggests 3 smartphones within the budget, prioritizing in-stock items.

4. Provide Feedback:

    If you like the recommendations, click Thumbs Up.
    
    If you are unsatisfied, click Thumbs Down to get alternative suggestions.

5. End the Call:

    Click Stop Recording.
    
    Save the transcription and analysis to an Excel file.
   
### Endpoints

    GET /: Serves the main HTML page.
    
    POST /get_response: Processes user input and returns sentiment, emotion, intent analysis, and product recommendations.
    
    POST /handle_feedback: Handles user feedback and updates recommendations accordingly.
    
    POST /post_call_insights: Generates post-call insights, including summaries, performance analytics, and follow-up suggestions.
    
    POST /negotiation_coach: Provides negotiation tactics and objection handling strategies.


## Feedback Mechanism
   The feedback mechanism is a core feature of Sentimind AI, allowing users to improve the quality of recommendations over time. Here's how it works:
    
    1. Thumbs Up:
    
        Indicates that the user is satisfied with the recommendations.
    
        The system will:
        
        Prioritize similar products in future searches.
    
        Increase the weight of positive feedback in the CRM for personalized recommendations.
    
    2. Thumbs Down:
    
        Indicates that the user is dissatisfied with the recommendations.
        
        The system will:
        
        Broaden the search criteria or shuffle the results.
        
        Adjust the recommendation algorithm to avoid similar products in the future.
        
        Log the feedback in the CRM for future reference.
    
    3. Feedback Integration:
    
        All feedback is stored in the CRM under the user's profile.
        
        The system uses this feedback to refine its understanding of user preferences and improve future interactions.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For questions or feedback, feel free to reach out:

- **Email**: resultyst@gmail.com
- **GitHub**: [Resultyst](https://github.com/Resultyst)
- **LinkedIn**: [Suryaa Narayanan K](https://www.linkedin.com/in/resultyst7/)

## Acknowledgments

- **Groq** for providing the AI API.
- **FAISS**: For efficient similarity search and clustering of dense vectors.
- **Sentence Transformers**: For generating high-quality sentence embeddings.
- **FastAPI**: For building the API with high performance and ease of use.
