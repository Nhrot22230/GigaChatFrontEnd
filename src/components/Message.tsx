import React from "react";
import { ClientMessage, Usuario } from "../interfaces/types";
import "../styles/Message.css";

interface MessageProps {
  message: ClientMessage;
  usuario: Usuario;
}

const Message: React.FC<MessageProps> = ({ message, usuario }) => {
  const MessageAvatar: React.FC = () => {
    return (
      <div className="message-avatar-container">
        <img
          src={`https://ui-avatars.com/api/?name=${message.usuario.username}&background=random`}
          alt={message.usuario.username}
          className="message-avatar"
        />
      </div>
    );
  };

  const MessageContent: React.FC = () => {
    return (
      <div className="message-content">
        {message.type === "texto" && <p>{message.content}</p>}
        {message.type === "imagen" && (
          <img src={message.content} alt="imagen" className="message-image" />
        )}
        <div className="message-timestamp">{timestamp}</div>
      </div>
    );
  };

  const isMine = message.usuario.id === usuario.id;

  const messageClass = isMine
    ? "message message--mine"
    : "message message--other";

  const timestamp = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString()
    : new Date().toLocaleTimeString();

  return (
    <div className={messageClass}>
      {!isMine && <MessageAvatar />}
      <MessageContent />
      {isMine && <MessageAvatar />}
    </div>
  );
};

export default Message;
