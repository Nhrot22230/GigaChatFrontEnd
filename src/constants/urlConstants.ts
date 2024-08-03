const API_URL = "https://gigachatbackend.onrender.com";

const CHATS_ENDPOINT = `${API_URL}/api/chats`;
const USUARIOS_ENDPOINT = `${API_URL}/api/usuarios`;

const WS_URL = `${API_URL}/ws`;

const APP_ENDPOINT = "/app";
const SEND_MESSAGE_URL = `${APP_ENDPOINT}/chat/send`;
const SEND_NOTIFICATION_URL = `${APP_ENDPOINT}/notify`;

const NOTIFICATION_SUBSCRIBE_URL = "/queue/notification";
const SUBSCRIBE_CHAT_URL = "/topic/chat";

export {
  CHATS_ENDPOINT,
  USUARIOS_ENDPOINT,
  WS_URL,
  SEND_MESSAGE_URL,
  SUBSCRIBE_CHAT_URL,
  NOTIFICATION_SUBSCRIBE_URL,
  SEND_NOTIFICATION_URL,
};
