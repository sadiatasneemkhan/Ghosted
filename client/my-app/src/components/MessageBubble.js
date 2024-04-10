import React from "react";
import "./Chat.css"; // Importing our CSS for styling
import moment from "moment";

function ChatBubble({ message, isUser }) {
  return (
    <div className={`chat-bubble ${isUser ? "user" : "other"}`}>
      <p className="message-content">{message.content}</p>
      <span className="timestamp">
        {moment(message.sent_at).format("MMM-DD HH:MM")}
      </span>
    </div>
  );
}

export default ChatBubble;
