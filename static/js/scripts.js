const initialForm = document.getElementById("initial-form");
const mainContent = document.getElementById("main-content");
const userInfoForm = document.getElementById("user-info-form");
const viewToggle = document.getElementById("view-toggle");
const userView = document.getElementById("user-view");
const salespersonView = document.getElementById("salesperson-view");

// Toggle Switch Logic
viewToggle.addEventListener("change", () => {
  if (viewToggle.checked) {
    // Salesperson View
    userView.classList.add("hidden");
    salespersonView.classList.remove("hidden");
    document.getElementById("post-call-insights").classList.remove("hidden"); // Show Post-Call Insights
    document.getElementById("negotiation-coach").classList.remove("hidden"); // Show Negotiation Coach
  } else {
    // User View
    userView.classList.remove("hidden");
    salespersonView.classList.add("hidden");
    document.getElementById("post-call-insights").classList.add("hidden"); // Hide Post-Call Insights
    document.getElementById("negotiation-coach").classList.add("hidden"); // Hide Negotiation Coach
  }
});

userInfoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Here you can send the name and email to the backend if needed
  console.log(`Name: ${name}, Email: ${email}`);

  // Hide the initial form and show the main content
  initialForm.classList.add("hidden");
  mainContent.classList.remove("hidden");

  // Default to User View
  viewToggle.checked = false;
  userView.classList.remove("hidden");
  salespersonView.classList.add("hidden");
});

// Rest of your existing JavaScript code for the main UI
const startRecordingBtn = document.getElementById("start-recording");
const stopRecordingBtn = document.getElementById("stop-recording");
const saveTranscriptBtn = document.getElementById("save-transcript");
const saveTranscriptSalesBtn = document.getElementById("save-transcript-sales");
const spokenText = document.getElementById("spoken-text");
const sentimentResult = document.getElementById("sentiment-result");
const emotionResult = document.getElementById("emotion-result");
const engagementBar = document.getElementById("engagement-bar");
const engagementFeedback = document.getElementById("engagement-feedback");
const purchaseIntent = document.getElementById("purchase-intent");
const behavioralIntent = document.getElementById("behavioral-intent");
const advancedIntent = document.getElementById("advanced-intent");
const suggestionsResult = document.getElementById("suggestions-result");
const transcriptionList = document.getElementById("transcription-list");
const negotiationTactics = document.getElementById("negotiation-tactics");
const objectionHandling = document.getElementById("objection-handling");
const dealRecommendationsResult = document.getElementById(
  "deal-recommendations-result"
);

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.continuous = true;

let sentimentData = [];
let sentimentLabels = [];
let isRecording = false;
let transcriptionData = [];

const ctx = document.getElementById("sentiment-chart").getContext("2d");
const sentimentChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: sentimentLabels,
    datasets: [
      {
        label: "Sentiment Trend",
        data: sentimentData,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        lineTension: 0.2,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: -1,
        max: 1,
        ticks: {
          stepSize: 0.5,
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          lineWidth: 0.5,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          line0: {
            type: "line",
            yMin: 0,
            yMax: 0,
            borderColor: "#FF5722",
            borderWidth: 2,
            label: {
              enabled: false,
            },
          },
        },
      },
    },
  },
});

recognition.onstart = () => {
  console.log("Recording started"); // Debugging
  isRecording = true;
  startRecordingBtn.classList.add("hidden");
  stopRecordingBtn.classList.remove("hidden");
  saveTranscriptBtn.classList.remove("hidden");
  saveTranscriptSalesBtn.classList.remove("hidden");
};

recognition.onend = () => {
  console.log("Recording stopped"); // Debugging
  isRecording = false;
  startRecordingBtn.classList.remove("hidden");
  stopRecordingBtn.classList.add("hidden");
  saveTranscriptBtn.classList.remove("hidden");
  saveTranscriptSalesBtn.classList.remove("hidden");

  // Generate post-call insights
  generatePostCallInsights();
};

recognition.onresult = async (event) => {
  const text = event.results[event.results.length - 1][0].transcript;
  spokenText.textContent = `You said: ${text}`;

  // Handle user input for coaching
  handleUserInputForCoaching(text);

  // Fetch sentiment, emotion, and intent analysis
  const response = await fetch("/get_response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_input: text }),
  });

  const data = await response.json();

  // Update sentiment, emotion, engagement, and intent results
  sentimentResult.textContent = data.sentiment;
  emotionResult.textContent = data.emotion;
  purchaseIntent.textContent = `Purchase Intent: ${data.purchase_intent}`;
  behavioralIntent.textContent = `Behavioral Intent: ${data.behavioral_intent}`;
  advancedIntent.textContent = `Advanced Intent: ${data.advanced_intent}`;
  suggestionsResult.textContent = data.suggestions;

  // Update sentiment chart
  let sentimentValue = 0;
  let sentimentColor = "#FF5722";
  if (data.sentiment === "Very Positive") {
    sentimentValue = 1;
    sentimentColor = "#4CAF50";
  } else if (data.sentiment === "Positive") {
    sentimentValue = 0.5;
    sentimentColor = "#8BC34A";
  } else if (data.sentiment === "Neutral") {
    sentimentValue = 0;
    sentimentColor = "#FF9800";
  } else if (data.sentiment === "Negative") {
    sentimentValue = -0.5;
    sentimentColor = "#F44336";
  } else if (data.sentiment === "Very Negative") {
    sentimentValue = -1;
    sentimentColor = "#D32F2F";
  }

  sentimentChart.data.datasets[0].borderColor = sentimentColor;
  sentimentChart.data.datasets[0].backgroundColor = `${sentimentColor}30`;

  sentimentData.push(sentimentValue);
  sentimentLabels.push(new Date().toLocaleString());
  sentimentChart.update();

  // Update engagement bar
  let engagementPercentage = 50;
  let engagementText = "Moderate engagement";

  if (data.sentiment === "Very Positive") {
    engagementPercentage = 100;
    engagementText = "High engagement";
  } else if (data.sentiment === "Positive") {
    engagementPercentage = 75;
    engagementText = "Moderate-to-High engagement";
  } else if (data.sentiment === "Neutral") {
    engagementPercentage = 50;
    engagementText = "Moderate engagement";
  } else if (data.sentiment === "Negative") {
    engagementPercentage = 25;
    engagementText = "Low engagement";
  } else if (data.sentiment === "Very Negative") {
    engagementPercentage = 10;
    engagementText = "Very Low engagement";
  }

  engagementBar.style.width = `${engagementPercentage}%`;
  engagementFeedback.textContent = engagementText;

  // Add transcription data to the list
  const listItem = document.createElement("li");
  listItem.textContent = `${new Date().toLocaleString()}: ${text}`;
  transcriptionList.appendChild(listItem);

  // Save transcription data for export
  transcriptionData.push({
    timestamp: new Date().toLocaleString(),
    user_input: text,
    sentiment: data.sentiment,
    emotion: data.emotion,
    engagement: engagementText,
    purchase_intent: data.purchase_intent,
    behavioral_intent: data.behavioral_intent,
    advanced_intent: data.advanced_intent,
    suggestions: data.suggestions,
  });

  // Fetch deal recommendations
  const recommendations = await fetchDealRecommendations(text);

  if (recommendations.error) {
    console.error(recommendations.error);
  } else {
    // Display recommendations in the UI
    const recommendationsDiv = document.createElement("div");
    recommendationsDiv.innerHTML = `
                    <h3>Deal Recommendations</h3>
                    <p>Product: ${recommendations.product}</p>
                    <p>Recommended Price: $${
                      recommendations.recommended_price
                    }</p>
                    <p>Recommended Discount: ${
                      recommendations.recommended_discount
                    }</p>
                    <p>Customer Segment: ${
                      recommendations.customer_segment || "N/A"
                    }</p>
                    <p>Competitor Price: $${
                      recommendations.competitor_price
                    }</p>
                    <p>Competitor Discount: ${
                      recommendations.competitor_discount
                    }</p>
                    <p>Market Share: ${recommendations.market_share}</p>
                `;
    dealRecommendationsResult.appendChild(recommendationsDiv);
  }
};

recognition.onerror = (event) => {
  console.error("Speech recognition error:", event.error);
};

startRecordingBtn.addEventListener("click", () => {
  recognition.start();
});

stopRecordingBtn.addEventListener("click", () => {
  recognition.stop();
});

// Function to fetch deal recommendations
const fetchDealRecommendations = async (userInput) => {
  try {
    const response = await fetch("/get_deal_recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_input: userInput }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching deal recommendations:", error);
    return { error: "Failed to fetch recommendations" };
  }
};

// Function to generate post-call insights
const generatePostCallInsights = async () => {
  try {
    // Combine all transcriptions into a single string
    const transcription = transcriptionData
      .map((entry) => entry.user_input)
      .join(" ");

    // Show loading spinner
    document.getElementById("loading-spinner").classList.remove("hidden");

    // Fetch insights from the backend
    const response = await fetch("/post_call_insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcription }),
    });

    const data = await response.json();

    // Hide loading spinner
    document.getElementById("loading-spinner").classList.add("hidden");

    // Display insights in the UI
    document.getElementById("call-summary").textContent = data.summary;
    document.getElementById("performance-analytics").textContent =
      data.performance_analytics;
    document.getElementById("deal-status").textContent = data.deal_status;
    document.getElementById("follow-up-suggestions").textContent =
      data.follow_up_suggestions;

    // Show the post-call insights section only in Salesperson View
    if (viewToggle.checked) {
      document.getElementById("post-call-insights").classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error generating post-call insights:", error);
    alert("Failed to generate post-call insights. Please try again.");
  }
};

// Function to save insights as a file
const saveInsights = () => {
  const insights = {
    summary: document.getElementById("call-summary").textContent,
    performanceAnalytics: document.getElementById("performance-analytics")
      .textContent,
    dealStatus: document.getElementById("deal-status").textContent,
    followUpSuggestions: document.getElementById("follow-up-suggestions")
      .textContent,
  };

  // Convert insights to JSON
  const jsonData = JSON.stringify(insights, null, 2);

  // Create a Blob and download the file
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "post_call_insights.json";
  a.click();
  URL.revokeObjectURL(url);
};

// Event listener for the "Save Insights" button
document
  .getElementById("save-insights")
  .addEventListener("click", saveInsights);

// Function to provide negotiation coaching
const provideNegotiationCoaching = async (user_input) => {
  try {
    // Show loading spinner
    document.getElementById("loading-spinner").classList.remove("hidden");

    // Fetch coaching suggestions from the backend
    const response = await fetch("/negotiation_coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_input }),
    });

    const data = await response.json();

    // Hide loading spinner
    document.getElementById("loading-spinner").classList.add("hidden");

    // Display coaching suggestions in the UI
    negotiationTactics.textContent = data.negotiation_tactics;
    objectionHandling.textContent = data.objection_handling;

    // Show the negotiation coach section only in Salesperson View
    if (viewToggle.checked) {
      document.getElementById("negotiation-coach").classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error providing negotiation coaching:", error);
    alert("Failed to provide negotiation coaching. Please try again.");
  }
};

// Function to handle user input for coaching
const handleUserInputForCoaching = (text) => {
  const coachingKeywords = ["price", "discount", "deal", "offer", "negotiate"];
  if (
    coachingKeywords.some((keyword) => text.toLowerCase().includes(keyword))
  ) {
    provideNegotiationCoaching(text);
  }
};
