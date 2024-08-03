export enum Estado {
  ACTIVO = "activo",
  INACTIVO = "inactivo",
  BLOQUEADO = "bloqueado"
}

export interface Usuario {
  id: number;
  username: string;
  estado: Estado;
  email?: string; 
  fechaRegistro?: string; 
}

export type LoginRequest = {
  readonly username: string;
  readonly password: string;
};

export enum MessageType {
  TEXT = "texto",
  IMAGE = "imagen",
  ARCHIVO = "archivo"
}

export type ClientMessage = {
  chatId: number;
  readonly usuario: Usuario;
  readonly type: MessageType;
  readonly content: string;
  readonly timestamp?: string;
};

export enum ChatType {
  INDIVIDUAL = "individual",
  GRUPAL = "grupal"
}

export type Chat = {
  readonly id: number; 
  readonly titulo: string; 
  readonly fechaCreacion: string;
  readonly tipo: ChatType;
  readonly descripcion?: string | null;
  readonly imagen?: string | null;
  lastMessage?: ClientMessage | null;
  usuarios?: Usuario[] | null;
  messages?: ClientMessage[] | null;
};

export type UserNotification = {
  readonly chat: Chat;
  readonly messages: ClientMessage[];
};