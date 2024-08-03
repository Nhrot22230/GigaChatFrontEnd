import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chat,
  ClientMessage,
  UserNotification,
  Usuario,
} from "../interfaces/types";
import DEFAULT_USER from "../constants/default";
import APIConsumer from "../api/APIConsumer";
import Aside from "../components/Aside";
import ChatBox from "../components/ChatBox";
import Header from "../components/Header";
import "../styles/GigaChat.css";
import { NOTIFICATION_SUBSCRIBE_URL } from "../constants/urlConstants";

const GigaChat: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario>(DEFAULT_USER);
  const [chats, setChats] = useState<Map<number, Chat>>(new Map());
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = sessionStorage.getItem("usuario");
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const data = JSON.parse(user) as Usuario;
        setUsuario(data);
        const [fetchedChats, fetchedMessages] = await Promise.all([
          APIConsumer.getUserChats(data.id),
          APIConsumer.getMessagesFromUserChats(data.id),
        ]);

        const chatsMap = new Map<number, Chat>();
        fetchedChats.forEach((chat) => {
          chat.messages = [];
          chatsMap.set(chat.id, chat);
        });

        fetchedMessages.forEach((msg) => {
          const chat = chatsMap.get(msg.chatId);
          if (chat) {
            chat.messages = [...(chat.messages || []), msg];
            chat.lastMessage = msg;
            chatsMap.set(msg.chatId, chat);
          }
        });

        const client = await APIConsumer.connect();
        client.onConnect = () => {
          client.subscribe(
            `${NOTIFICATION_SUBSCRIBE_URL}/${data.id}`,
            (message) => {
              const noti = JSON.parse(message.body) as UserNotification;
              handleNewNotification(noti);
            }
          );

          fetchedChats.forEach((chat) =>
            APIConsumer.subscribeChat(chat, handleNewMessage)
          );
        };
        setChats(chatsMap);
      } catch (error) {
        setError("Error al obtener los datos. Por favor, inténtelo de nuevo.");
        console.error("Error al obtener los datos", error);
      }
    };

    fetchData();
    return () => APIConsumer.disconnect();
  }, [navigate]);

  const handleNewMessage = (msg: ClientMessage) => {
    let updatedChat: Chat;
    setChats((prevChats) => {
      const newChats = new Map(prevChats);
      const chat = newChats.get(msg.chatId);

      if (chat) {
        updatedChat = { ...chat };
        updatedChat.messages = [...(updatedChat.messages || []), msg];
        updatedChat.lastMessage = msg;
        newChats.set(msg.chatId, updatedChat);
      }

      return newChats;
    });

    setSelectedChat((prevChat) => {
      return prevChat?.id === msg.chatId ? updatedChat : prevChat;
    });
  };

  const handleNewNotification = (noti: UserNotification) => {
    const { chat, messages } = noti;
    const chatId = chat.id;
    const chatMessages = chat.messages || [];
    const newMessages = chatMessages.concat(messages);
    const updatedChat = {
      ...chat,
      messages: newMessages,
      lastMessage: messages[messages.length - 1],
    };

    setChats((prevChats) => {
      prevChats.set(chatId, updatedChat);
      return new Map(prevChats);
    });

    APIConsumer.subscribeChat(updatedChat, handleNewMessage);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("usuario");
    APIConsumer.disconnect();
    navigate("/login");
  };

  return (
    <div className="gigachat">
      <Header usuario={usuario} handleLogout={handleLogout} />
      <main className="gigachat-content">
        {error && <div className="error-message">{error}</div>}
        <Aside
          chats={Array.from(chats.values())}
          setSelectChat={setSelectedChat}
          usuario={usuario}
        />
        {selectedChat && (
          <ChatBox
            chat={selectedChat}
            usuario={usuario}
            messages={selectedChat.messages || []}
            setChat={setSelectedChat}
          />
        )}
      </main>
    </div>
  );
};

export default GigaChat;
