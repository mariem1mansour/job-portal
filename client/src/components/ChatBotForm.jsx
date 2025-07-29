import { useRef } from "react";

const ChatBotForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    // Clear input
    inputRef.current.value = "";

    // Add user message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Simulate thinking
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking ..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above, please address in a clear, organized way. Use bullet points, numbered steps, and sections if needed. Do not use markdown syntax, but use line breaks and spacing for readability, this query in 70 words : ${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 text-sm border border-fuchsia-200 rounded-full focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent shadow-sm bg-white"
        required
      />
      <button
        type="submit"
        className="w-10 h-10 bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-full flex items-center justify-center transition active:scale-95 shadow-md"
      >
        <span className="material-symbols-outlined text-sm">send</span>
      </button>
    </form>
  );
};

export default ChatBotForm;
