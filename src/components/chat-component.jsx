import React, { useState } from "react";
import OpenAI from "openai";
import { jsPDF } from "jspdf";
import { useNavigate } from 'react-router-dom'
function ChatComponent() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const navigate = useNavigate()
  const handleChat = async () => {
    if (!message.trim() && !fileContent) return;
    setLoading(true);

    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
        baseURL: "https://api.x.ai/v1",
      });

      const completion = await openai.chat.completions.create({
        model: "grok-beta",
        messages: [
          { role: "system", content: "You are Grok, a  form making chatbot . Your aim is to make professional government form .  " },
          { role: "user", content: fileContent || message },
        ],
      });

      const rawResponse = completion.choices[0].message.content;
      console.log("Raw API response:", rawResponse);
      setResponse(rawResponse);
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleFileUpload = (e) => {
  //   const uploadedFile = e.target.files[0];
  //   setFile(uploadedFile);

  //   if (uploadedFile) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setFileContent(event.target.result);
  //     };
  //     reader.readAsText(uploadedFile);
  //   }
  // };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Chat with Grok - Form Details", 10, 10);

    // Add message content
    doc.setFontSize(12);
    doc.text("Message:", 10, 20);
    doc.text(message || "No message entered.", 10, 30, { maxWidth: 190 });

    // Add response content
    doc.text("Response:", 10, 50);
    doc.text(response || "No response received yet.", 10, 60, { maxWidth: 190 });

    // Save the PDF
    doc.save("form_details.pdf");
  };

  return (
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

        {/* File Upload */}
        {/* <input
          type="file"
          className="block mb-4"
          accept=".txt,.json,.csv,.md"
          onChange={handleFileUpload}
        /> */}

        <div className="justify-center flex" >
          <button
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 px-4 rounded hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 mb-2"
            onClick={handleChat}
            disabled={loading}
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </div>

        <div className="justify-center flex">
          <button
            className=" mt-5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 px-4 rounded hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 mb-2 ml ml-5"
            onClick={downloadPDF}
          >
            Download as PDF
          </button>
           
        </div>
        <div className="justify-center flex" >
            <button
              className=" mt-5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 px-4 rounded hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 mb-2 ml ml-5"
              onClick={() => navigate('/')}
            >
              Return to Home Page !
            </button>
          </div>
      </div>

      {/* Right Side - Output */}
      <div className="md:w-1/2 p-4">
        <h2 className="text-xl text-white font-semibold mb-4">Response</h2>
        <div
          className="border rounded-md p-4 bg-gray-100 max-h-96 overflow-y-auto"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {response || "Your response will appear here."}
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
