const initialForm = document.getElementById('initial-form');
        const mainContent = document.getElementById('main-content');
        const userInfoForm = document.getElementById('user-info-form');
        const viewToggle = document.getElementById('view-toggle');
        const userView = document.getElementById('user-view');
        const salespersonView = document.getElementById('salesperson-view');

        // Toggle Switch Logic
        viewToggle.addEventListener('change', () => {
            if (viewToggle.checked) {
                // Salesperson View
                userView.classList.add('hidden');
                salespersonView.classList.remove('hidden');
            } else {
                // User View
                userView.classList.remove('hidden');
                salespersonView.classList.add('hidden');
            }
        });

        userInfoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            // Here you can send the name and email to the backend if needed
            console.log(`Name: ${name}, Email: ${email}`);

            // Hide the initial form and show the main content
            initialForm.classList.add('hidden');
            mainContent.classList.remove('hidden');

            // Default to User View
            viewToggle.checked = false;
            userView.classList.remove('hidden');
            salespersonView.classList.add('hidden');
        });

        // Rest of your existing JavaScript code for the main UI
        const startRecordingBtn = document.getElementById('start-recording');
        const stopRecordingBtn = document.getElementById('stop-recording');
        const saveTranscriptBtn = document.getElementById('save-transcript');
        const saveTranscriptSalesBtn = document.getElementById('save-transcript-sales');
        const spokenText = document.getElementById('spoken-text');
        const sentimentResult = document.getElementById('sentiment-result');
        const emotionResult = document.getElementById('emotion-result');
        const engagementBar = document.getElementById('engagement-bar');
        const engagementFeedback = document.getElementById('engagement-feedback');
        const purchaseIntent = document.getElementById('purchase-intent');
        const behavioralIntent = document.getElementById('behavioral-intent');
        const advancedIntent = document.getElementById('advanced-intent');
        const suggestionsResult = document.getElementById('suggestions-result');
        const transcriptionList = document.getElementById('transcription-list');

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.continuous = true;

        let sentimentData = [];
        let sentimentLabels = [];
        let isRecording = false;
        let transcriptionData = [];

        const ctx = document.getElementById('sentiment-chart').getContext('2d');
        const sentimentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sentimentLabels,
                datasets: [{
                    label: 'Sentiment Trend',
                    data: sentimentData,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    fill: true,
                    lineTension: 0.2,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        min: -1,
                        max: 1,
                        ticks: {
                            stepSize: 0.5
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            lineWidth: 0.5
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    annotation: {
                        annotations: {
                            line0: {
                                type: 'line',
                                yMin: 0,
                                yMax: 0,
                                borderColor: '#FF5722',
                                borderWidth: 2,
                                label: {
                                    enabled: false
                                }
                            }
                        }
                    }
                }
            }
        });

        recognition.onstart = () => {
            console.log("Recording started"); // Debugging
            isRecording = true;
            startRecordingBtn.classList.add('hidden');
            stopRecordingBtn.classList.remove('hidden');
            saveTranscriptBtn.classList.remove('hidden');
            saveTranscriptSalesBtn.classList.remove('hidden');
        };

        recognition.onend = () => {
            console.log("Recording stopped"); // Debugging
            isRecording = false;
            startRecordingBtn.classList.remove('hidden');
            stopRecordingBtn.classList.add('hidden');
            saveTranscriptBtn.classList.remove('hidden');
            saveTranscriptSalesBtn.classList.remove('hidden');
        };

        recognition.onresult = (event) => {
            console.log("Speech recognized"); // Debugging
            const text = event.results[event.results.length - 1][0].transcript;
            spokenText.textContent = `You said: ${text}`;

            fetch('/get_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_input: text })
            })
            .then(response => response.json())
            .then(data => {
                const sentiment = data.sentiment;
                const emotion = data.emotion;
                const engagement = data.engagement;
                const purchase = data.purchase_intent;
                const behavioral = data.behavioral_intent;
                const advanced = data.advanced_intent;
                const suggestions = data.suggestions;
                const timestamp = new Date().toLocaleString();

                // Update sentiment, emotion, engagement, and intent results
                sentimentResult.textContent = `${sentiment}`;
                emotionResult.textContent = `${emotion}`;
                purchaseIntent.textContent = `Purchase Intent: ${purchase}`;
                behavioralIntent.textContent = `Behavioral Intent: ${behavioral}`;
                advancedIntent.textContent = `Advanced Intent: ${advanced}`;
                suggestionsResult.textContent = `${suggestions}`;

                // Update sentiment chart
                let sentimentValue = 0;
                let sentimentColor = '#FF5722';
                if (sentiment === 'Very Positive') {
                    sentimentValue = 1;
                    sentimentColor = '#4CAF50';
                } else if (sentiment === 'Positive') {
                    sentimentValue = 0.5;
                    sentimentColor = '#8BC34A';
                } else if (sentiment === 'Neutral') {
                    sentimentValue = 0;
                    sentimentColor = '#FF9800';
                } else if (sentiment === 'Negative') {
                    sentimentValue = -0.5;
                    sentimentColor = '#F44336';
                } else if (sentiment === 'Very Negative') {
                    sentimentValue = -1;
                    sentimentColor = '#D32F2F';
                }

                sentimentChart.data.datasets[0].borderColor = sentimentColor;
                sentimentChart.data.datasets[0].backgroundColor = `${sentimentColor}30`;

                sentimentData.push(sentimentValue);
                sentimentLabels.push(timestamp);
                sentimentChart.update();

                // Update engagement bar
                let engagementPercentage = 50;
                let engagementText = "Moderate engagement";

                if (sentiment === 'Very Positive') {
                    engagementPercentage = 100;
                    engagementText = "High engagement";
                } else if (sentiment === 'Positive') {
                    engagementPercentage = 75;
                    engagementText = "Moderate-to-High engagement";
                } else if (sentiment === 'Neutral') {
                    engagementPercentage = 50;
                    engagementText = "Moderate engagement";
                } else if (sentiment === 'Negative') {
                    engagementPercentage = 25;
                    engagementText = "Low engagement";
                } else if (sentiment === 'Very Negative') {
                    engagementPercentage = 10;
                    engagementText = "Very Low engagement";
                }

                engagementBar.style.width = `${engagementPercentage}%`;
                engagementFeedback.textContent = engagementText;

                // Add transcription data to the list
                const listItem = document.createElement('li');
                listItem.textContent = `${timestamp}: ${text}`;
                transcriptionList.appendChild(listItem);

                // Save transcription data for export
                transcriptionData.push({
                    timestamp: timestamp,
                    user_input: text,
                    sentiment: sentiment,
                    emotion: emotion,
                    engagement: engagementText,
                    purchase_intent: purchase,
                    behavioral_intent: behavioral,
                    advanced_intent: advanced,
                    suggestions: suggestions
                });
            });
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error); // Debugging
        };

        startRecordingBtn.addEventListener('click', () => {
            console.log("Start Recording clicked"); // Debugging
            recognition.start();
        });

        stopRecordingBtn.addEventListener('click', () => {
            console.log("Stop Recording clicked"); // Debugging
            recognition.stop();
        });

        // Save Transcript Functionality (for both User and Sales Views)
        const saveTranscript = () => {
            const workbook = XLSX.utils.book_new();
            const worksheetData = [
                ["Date & Timestamp", "User Input", "Sentiment", "Emotional State", "Buyer Engagement", "Purchase Intent", "Behavioral Intent", "Advanced Intent", "Suggestions"]
            ];

            transcriptionData.forEach(entry => {
                worksheetData.push([
                    entry.timestamp,
                    entry.user_input,
                    entry.sentiment,
                    entry.emotion,
                    entry.engagement,
                    entry.purchase_intent,
                    entry.behavioral_intent,
                    entry.advanced_intent,
                    entry.suggestions
                ]);
            });

            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Transcript');
            XLSX.writeFile(workbook, 'transcript.xlsx');
        };

        saveTranscriptBtn.addEventListener('click', saveTranscript);
        saveTranscriptSalesBtn.addEventListener('click', saveTranscript);