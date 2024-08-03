import React from "react";
import { Usuario } from "../interfaces/types";
import "../styles/UserCard.css";

interface UserCardProps {
  usuario: Usuario;
}

const UserCard: React.FC<UserCardProps> = ({ usuario }) => {
  return (
    <div className="user-card">
      <div className="user-card-avatar">
        <img
          src={`https://ui-avatars.com/api/?name=${usuario.username}&background=random`}
          alt={usuario.username}
        />
      </div>
      <div className="user-card-info">
        <h2 className="user-card-username">{usuario.username}</h2>
        <p className="user-card-email">{usuario.email || "No proporcionado"}</p>
      </div>
    </div>
  );
};

export default UserCard;
