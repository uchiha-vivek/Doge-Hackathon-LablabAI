import { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import OpenAI from "openai";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function CitizenFeedback() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentimentAnalysis, setSentimentAnalysis] = useState({ positive: 0, neutral: 0, negative: 0 });
  const [error, setError] = useState("");

  const handleChat = async () => {
    if (!message.trim()) return;
    setLoading(true);

    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
        baseURL: "https://api.x.ai/v1",
      });

      // Make an API call to the OpenAI model for feedback sentiment analysis
      const completion = await openai.chat.completions.create({
        model: "grok-beta",
        messages: [
          { role: "system", content: "You are Grok, a form-making chatbot. Your aim is to analyze the sentiment of the feedback provided by the user." },
          { role: "user", content: message },
        ],
      });

      const rawResponse = completion.choices[0].message.content;
      setResponse(rawResponse);

      // Simple sentiment categorization (for example)
      const sentiment = analyzeSentiment(rawResponse);
      updateSentimentCount(sentiment);

    } catch (error) {
      console.error("Error fetching chat response:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to analyze sentiment (simple categorization)
  const analyzeSentiment = (text) => {
    if (text.includes("positive") || text.includes("good")) {
      return "positive";
    } else if (text.includes("negative") || text.includes("bad")) {
      return "negative";
    } else {
      return "neutral";
    }
  };

  // Function to update sentiment analysis count
  const updateSentimentCount = (sentiment) => {
    setSentimentAnalysis((prevState) => {
      const updated = { ...prevState };
      if (sentiment === "positive") updated.positive += 1;
      else if (sentiment === "negative") updated.negative += 1;
      else updated.neutral += 1;
      return updated;
    });
  };

  const pieData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [sentimentAnalysis.positive, sentimentAnalysis.neutral, sentimentAnalysis.negative],
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
        hoverBackgroundColor: ["#45a049", "#ffca28", "#e53935"],
      },
    ],
  };

  const barData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Feedback Count",
        data: [sentimentAnalysis.positive, sentimentAnalysis.neutral, sentimentAnalysis.negative],
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Side - Input */}
        <div className="md:w-1/2 p-4 border-r border-gray-300">
          <h1 className="text-2xl font-bold mb-4">Chat With Grok</h1>

          {/* Text Input */}
          <textarea
            className="w-full p-2 border rounded-md h-32 mb-4"
            placeholder="Ask me anything"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="justify-center flex" >
          <button
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 px-4 rounded hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 mb-2"
            onClick={handleChat}
            disabled={loading}
          >
            {loading ? "Loading..." : "Send"}
          </button>
          </div>
        </div>

        {/* Right Side - Output */}
        <div className="md:w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">Response</h2>
          <div
            className="border rounded-md p-4 bg-gray-100 max-h-96 overflow-y-auto"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {response || "Your response will appear here."}
          </div>

          {/* Sentiment Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Sentiment Distribution (Pie)</h2>
              <div className="h-64">
                <Pie data={pieData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Sentiment Count (Bar)</h2>
              <div className="h-64">
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CitizenFeedback;
