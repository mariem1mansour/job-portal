import { useState, useRef, useEffect } from "react";
import ChatBotIcon from "./ChatBotIcon";
import { useAuth } from "@clerk/clerk-react";

const DashboardChat = () => {
  const { isSignedIn } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm your HR Assistant. Ask me about jobs, applicants, or hiring trends.",
    },
  ]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef();

  useEffect(() => {
    chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setMessages((prev) => [...prev, { role: "bot", text: "Thinking..." }]);

    try {
      const res = await fetch("/api/dashboard-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, chatHistory: messages }),
      });

      const data = await res.json();
      setMessages((prev) => prev.filter(m => m.text !== "Thinking..."));

      if (data.error) {
        setMessages((prev) => [...prev, { role: "bot", text: `Error: ${data.error}` }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      }
    } catch (err) {
      setMessages((prev) => prev.filter(m => m.text !== "Thinking..."));
      setMessages((prev) => [...prev, { role: "bot", text: "Failed to connect to AI." }]);
    }
  };

  if (!isSignedIn) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setShowChat((prev) => !prev)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition z-40 flex items-center justify-center"
      >
        {showChat ? (
          <span className="material-symbols-rounded">close</span>
        ) : (
          <ChatBotIcon className="w-6 h-6" fill="#fff" />
        )}
      </button>

      {/* Chat Popup */}
      <div
        className={`fixed bottom-20 right-6 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-green-200 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 z-30 ${
          showChat ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white">
          <div className="flex items-center space-x-2">
            <ChatBotIcon className="w-7 h-7" fill="white" />
            <h2 className="font-semibold">HR Assistant</h2>
          </div>
          <button
            onClick={() => setShowChat(false)}
            className="p-1 hover:bg-white/20 rounded-full"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {/* Messages */}
        <div ref={chatBodyRef} className="flex flex-col h-80 px-4 py-3 space-y-2 overflow-y-auto bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "bot" && <ChatBotIcon className="w-6 h-6 mr-2 mt-1 text-green-500" />}
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-green-500 text-white rounded-br-md"
                    : "bg-green-50 text-gray-800 rounded-bl-md"
                }`}
              >
                {msg.text.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-3 py-3 bg-white border-t border-green-100">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about jobs or applicants..."
              className="flex-1 px-4 py-2 border border-green-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center"
            >
              <span className="material-symbols-rounded">send</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DashboardChat;