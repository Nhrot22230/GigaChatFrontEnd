import React from "react";
import SearchBar from "./SearchBar";
import { Chat, ChatType, Usuario } from "../interfaces/types";
import ChatCard from "./ChatCard";
import "../styles/Aside.css";

interface AsideProps {
  chats: Chat[];
  setSelectChat: (chat: Chat) => void;
  usuario: Usuario;
}

const Aside: React.FC<AsideProps> = ({ chats, setSelectChat, usuario }) => {
  const handleUserSelect = (user: Usuario) => {
    chats.forEach((chat) => {
      if (
        chat.tipo === ChatType.INDIVIDUAL && 
        chat.usuarios &&
        chat.usuarios.length === 2 &&
        chat.usuarios.some((u) => u.id === user.id)
      ) {
        setSelectChat(chat);
        return;
      }
    })
    
    const newChat: Chat = {
      id: 0,
      titulo: `${usuario.username} & ${user.username}`,
      descripcion: "Chat privado",
      tipo: ChatType.INDIVIDUAL,
      imagen: `https://ui-avatars.com/api/?name=${usuario.username}+${user.username}&background=random`,
      fechaCreacion: new Date().toISOString(),
      usuarios: [usuario, user],
    };

    setSelectChat(newChat);
  };

  return (
    <aside className="aside-container">
      <div className="aside-header">
        <h2>Chats</h2>
        <SearchBar usuarioId={usuario.id} onUserSelect={handleUserSelect} />
      </div>
      <div className="chat-list">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatCard
              key={chat.id}
              chat={chat}
              onClick={() => setSelectChat(chat)}
            />
          ))
        ) : (
          <p className="no-chats-message">No chats available</p>
        )}
      </div>
    </aside>
  );
};

export default Aside;
