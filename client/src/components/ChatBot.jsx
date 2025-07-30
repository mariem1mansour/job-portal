import { useEffect, useRef, useState } from "react";
import ChatBotIcon from "./ChatBotIcon";
import ChatBotForm from "./ChatBotForm";
import ChatMessage from "./ChatMessage";
import { websiteInfo } from "../websiteInfo";

const Chat = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: websiteInfo,
    },
  ]);
  const [showChatBot, setShowChatBot] = useState(false);
  const chatBodyRef = useRef();

  // const generateBotResponse = async (history) => {
  //   const updateHistory = (text, isError = false) => {
  //     setChatHistory((prev) =>
  //       prev
  //         .filter((msg) => msg.text !== "Thinking ...")
  //         .concat({
  //           role: "model",
  //           text,
  //           isError,
  //         })
  //     );
  //   };

  //   // Convert history to OpenRouter format
  //   const formattedMessages = history.map((msg) => ({
  //     role: msg.role === "model" ? "assistant" : msg.role,
  //     content: msg.text,
  //   }));

  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  //       // "HTTP-Referer": "http://localhost:5173",
  //       "HTTP-Referer": window.location.origin,

  //       "X-Title": "My Chatbot",
  //     },
  //     body: JSON.stringify({
  //       model: "google/gemini-pro-1.5",
  //       messages: formattedMessages,
  //       max_tokens: 2048,
  //     }),
  //   };

  //   try {
  //     console.log("🚀 Fetching URL:", import.meta.env.VITE_API_URL);
  //     console.log(
  //       "🚀 Authorization Header:",
  //       `Bearer ${import.meta.env.VITE_API_KEY}`
  //     );
  //     console.log(
  //       "🚀 Request Body:",
  //       JSON.stringify({
  //         model: "google/gemini-1.5-pro",
  //         messages: formattedMessages,
  //         max_tokens: 2048,
  //       })
  //     );
  //     console.log("🚀 VITE_API_URL:", import.meta.env.VITE_API_URL);
  //     console.log(
  //       "🚀 VITE_API_KEY (first 5 chars):",
  //       import.meta.env.VITE_API_KEY?.slice(0, 5)
  //     );
  //     const response = await fetch(
  //       import.meta.env.VITE_API_URL,
  //       requestOptions
  //     );
  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({}));
  //       throw new Error(errorData.error?.message || `HTTP ${response.status}`);
  //     }

  //     const data = await response.json();
  //     const botReply = data.choices[0].message.content;
  //     updateHistory(botReply);
  //   } catch (error) {
  //     console.error("OpenRouter Error:", error);
  //     updateHistory(`AI Error: ${error.message}`);
  //   }
  // };

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) =>
        prev
          .filter((msg) => msg.text !== "Thinking ...")
          .concat({
            role: "model",
            text,
            isError,
          })
      );
    };

    // Convert to OpenRouter message format
    const formattedMessages = history.map((msg) => ({
      role: msg.role === "model" ? "assistant" : msg.role,
      content: msg.text,
    }));

    try {
      const API_BASE =
        import.meta.env.VITE_SERVER_URL || "http://localhost:5000";
      const response = await fetch(`${API_BASE}/api/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: formattedMessages }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Request failed");
      }

      const data = await response.json();
      updateHistory(data.text);
    } catch (error) {
      console.error("Chatbot Error:", error);
      updateHistory(`AI Error: ${error.message}`);
    }
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <>
      {/* Chat Toggle Button (Fixed in Bottom Right) */}
      <button
        onClick={() => setShowChatBot((prev) => !prev)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-fuchsia-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 z-40 flex items-center justify-center focus:outline-none ring-4 ring-fuchsia-200`}
        aria-label="Toggle Chatbot"
      >
        {showChatBot ? (
          <span className="material-symbols-rounded text-2xl">X</span>
        ) : (
          <ChatBotIcon className="w-8 h-8" />
        )}
      </button>

      {/* Chat Popup (Slide-up with Pop Effect) */}
      <div
        className={`fixed bottom-20 right-6 w-80 sm:w-96 bg-white/90 backdrop-blur-xl border border-fuchsia-200 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out z-30 ${
          showChatBot
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white">
          <div className="flex items-center space-x-2">
            <ChatBotIcon className="w-8 h-8 text-white" />
            <h2 className="font-semibold text-lg">
              Rosa is ready for help 💪😉
            </h2>
          </div>
          <button
            onClick={() => setShowChatBot(false)}
            className="p-1 hover:bg-white/20 rounded-full transition"
          >
            <span className="material-symbols-rounded">X</span>
          </button>
        </div>

        {/* Chat Body */}
        <div
          ref={chatBodyRef}
          className="flex flex-col h-80 sm:h-96 px-4 py-3 space-y-3 overflow-y-auto scroll-smooth bg-gray-50"
        >
          {/* Initial Greeting */}
          <div className="flex items-start space-x-2 bg-fuchsia-50 p-3 rounded-xl max-w-xs sm:max-w-md shadow-sm">
            <ChatBotIcon className="w-6 h-6 mt-1 flex-shrink-0" />
            <p className="text-gray-800 text-sm leading-relaxed">
              Hey there 👋 Ask me anything about this site 😉!
            </p>
          </div>

          {/* Dynamic Chat History */}
          {chatHistory.map(
            (chat, index) =>
              !chat.hideInChat && <ChatMessage key={index} chat={chat} />
          )}
        </div>

        {/* Footer (Input Form) */}
        <div className="px-3 py-3 bg-white border-t border-fuchsia-100">
          <ChatBotForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
