import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  CHATS_ENDPOINT,
  NOTIFICATION_SUBSCRIBE_URL,
  SEND_MESSAGE_URL,
  SEND_NOTIFICATION_URL,
  SUBSCRIBE_CHAT_URL,
  USUARIOS_ENDPOINT,
  WS_URL,
} from "../constants/urlConstants";
import {
  Chat,
  ClientMessage,
  LoginRequest,
  UserNotification,
  Usuario,
} from "../interfaces/types";

const APIConsumer = (() => {
  let client: Client | null = null;

  const register = async (user: Usuario, pass: string) => {
    try {
      const response = await fetch(USUARIOS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, password: pass }),
      });
      if (!response.ok) return null;
      const data = (await response.json()) as Usuario;
      return data;
    } catch (error) {
      console.error("Error en el registro:", error);
      return null;
    }
  }

  const authenticate = async (login: LoginRequest) => {
    try {
      const response = await fetch(`${USUARIOS_ENDPOINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      if (!response.ok) return null;
      const data = (await response.json()) as Usuario;
      return data;
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return null;
    }
  };

  const buscarUsuarios = async (search: string): Promise<Usuario[]> => {
    try {
      const response = await fetch(`${USUARIOS_ENDPOINT}?search=${search}`);
      if (!response.ok) return [];

      const data = (await response.json()) as Usuario[];
      return data;
    } catch (error) {
      console.error("Error en la búsqueda de usuarios:", error);
      return [];
    }
  };

  const connect = async (): Promise<Client> => {
    if (client) return client;

    client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      debug: (str) => console.log(str),
    });

    client.activate();
    return client;
  };

  const getMessagesFromUserChats = async (
    userId: number
  ): Promise<ClientMessage[]> => {
    try {
      const response = await fetch(
        `${CHATS_ENDPOINT}/messages?userId=${userId}`
      );
      if (!response.ok) return [];
      const data = (await response.json()) as ClientMessage[];
      return data;
    } catch (error) {
      console.error("Error en la búsqueda de mensajes:", error);
      return [];
    }
  };

  const getUserChats = async (userId: number): Promise<Chat[]> => {
    try {
      const response = await fetch(`${CHATS_ENDPOINT}?userId=${userId}`);
      if (!response.ok) return [];
      const data = (await response.json()) as Chat[];
      return data;
    } catch (error) {
      console.error("Error en la búsqueda de chats:", error);
      return [];
    }
  };

  const disconnect = () => {
    client?.deactivate();
    client = null;
  };

  const sendMessage = (message: ClientMessage) => {
    if (!client) return;
    client.publish({
      headers: { "content-type": "application/json" },
      destination: `${SEND_MESSAGE_URL}/${message.chatId}`,
      body: JSON.stringify(message),
    });
  };

  const notifyNewChat = (notification: UserNotification) => {
    if (!client) return;

    notification.chat.usuarios?.forEach((user) => {
      client?.publish({
        headers: { "content-type": "application/json" },
        destination: `${SEND_NOTIFICATION_URL}/${user.id}`,
        body: JSON.stringify(notification),
      });
    });
  };

  const subscribeNotification = (
    userId: number,
    handleNotification: (notification: UserNotification) => void
  ) => {
    if (!client) return;

    client.subscribe(`${NOTIFICATION_SUBSCRIBE_URL}/${userId}`, (message) => {
      const data = JSON.parse(message.body) as UserNotification;
      handleNotification(data);
    });
  };

  const subscribeChat = (
    chat: Chat,
    handleMessage: (msg: ClientMessage) => void
  ) => {
    if (!client) return;
    client.subscribe(`${SUBSCRIBE_CHAT_URL}/${chat.id}`, (message) => {
      const data = JSON.parse(message.body) as ClientMessage;
      handleMessage(data);
    });
  };

  const createChat = async (chat: Chat): Promise<Chat> => {
    try {
      const response = await fetch(CHATS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chat),
      });
      if (!response.ok) return chat;
      const data = (await response.json()) as Chat;
      return data;
    } catch (error) {
      console.error("Error al crear el chat:", error);
      return chat;
    }
  };

  return {
    register,
    authenticate,
    buscarUsuarios,
    getMessagesFromUserChats,
    getUserChats,
    connect,
    disconnect,
    sendMessage,
    notifyNewChat,
    subscribeNotification,
    subscribeChat,
    createChat,
  };
})();

export default APIConsumer;
