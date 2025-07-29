import React from "react";
import ChatBotIcon from "./ChatBotIcon";

const ChatMessage = ({ chat }) => {
  if (chat.hideInChat) return null;

  const isBot = chat.role === "model";

  // Convert newlines to <br /> for proper rendering
  const formattedText = chat.text.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div
      className={`flex ${
        isBot ? "justify-start" : "justify-end"
      } animate-fade-in`}
    >
      {isBot && (
        <ChatBotIcon className="w-7 h-7 mr-2 mt-1 text-fuchsia-500 flex-shrink-0" />
      )}
      <div
        className={`max-w-xs sm:max-w-md px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isBot
            ? "bg-fuchsia-50 text-gray-800 rounded-bl-md"
            : "bg-fuchsia-500 text-white rounded-br-md"
        } ${chat.isError ? "border-l-4 border-red-400" : ""}`}
      >
        {chat.isError ? (
          <span className="flex items-center">
            <span className="material-symbols-outlined text-red-500 mr-1 text-sm">
              error
            </span>
            {chat.text}
          </span>
        ) : (
          formattedText
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
