import React from "react";
import { Chat } from "../interfaces/types";
import "../styles/ChatCard.css";

interface ChatProps {
  chat: Chat;
  onClick: () => void;
}

const ChatCard: React.FC<ChatProps> = ({ chat, onClick }) => {
  return (
    <div className="chat-card" onClick={onClick}>
      <div className="chat-card-header">
        <h3 className="chat-card-title">{chat.titulo} [{chat.id}]</h3>
        {chat.lastMessage && (
          <span className="chat-card-last-message-info">
            {chat.lastMessage.timestamp}
          </span>
        )}
      </div>
      {chat.lastMessage && (
        <p className="chat-card-last-message">
          {chat.lastMessage.usuario.username}: {chat.lastMessage.content}
        </p>
      )}
    </div>
  );
};

export default ChatCard;
