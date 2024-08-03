import React, { useEffect, useRef } from "react";
import {
  Chat,
  ClientMessage,
  MessageType,
  Usuario,
} from "../interfaces/types";
import APIConsumer from "../api/APIConsumer";
import "../styles/ChatBox.css";
import Message from "./Message";

interface ChatBoxProps {
  chat: Chat;
  usuario: Usuario;
  messages: ClientMessage[];
  setChat: (chat: Chat) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chat, usuario, messages, setChat }) => {
  const [message, setMessage] = React.useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (message.trim() === "") return;

    let newMessage: ClientMessage = {
      chatId: chat.id,
      usuario: usuario,
      type: MessageType.TEXT,
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    if (chat.id === 0) {
      const data = await APIConsumer.createChat(chat);
      if (!data) return;
      newMessage.chatId = data.id;
      APIConsumer.notifyNewChat({
        chat: data,
        messages: [newMessage],
      });
      data.messages = [newMessage];
      setChat(data);
    }
    APIConsumer.sendMessage(newMessage);
    setMessage("");
  };

  return (
    <div className="chat-box">
      <div className="chat-box-header">
        {chat.imagen && (
          <img src={chat.imagen} alt={chat.titulo} className="chat-box-image" />
        )}
        <div className="chat-box-info">
          <h2 className="chat-box-name">{chat.titulo}</h2>
          <p className="chat-box-description">
            {chat.descripcion
              ? `Descripcion: ${chat.descripcion}`
              : `Fecha de Creacion: ${chat.fechaCreacion}`}
          </p>
        </div>
      </div>
      <div id="messages" className="chat-box-messages">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} usuario={usuario} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-box-input">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBox;
