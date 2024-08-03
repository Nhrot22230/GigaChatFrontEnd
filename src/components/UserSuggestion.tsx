import React from "react";
import { Usuario } from "../interfaces/types";
import "../styles/UserSuggestion.css";

interface UserSuggestionProps {
  usuario: Usuario;
  onSelect: () => void;
}

const UserSuggestion: React.FC<UserSuggestionProps> = ({ usuario, onSelect }) => {
  return (
    <li className="user-suggestion" onClick={onSelect}>
      <div className="user-avatar">
        <img src={`https://ui-avatars.com/api/?name=${usuario.username}&background=random`} alt={usuario.username} />
      </div>
      <div className="user-info">
        <span className="username">{usuario.username}</span>
        <span className="user-id">[{usuario.id}]</span>
      </div>
    </li>
  );
};

export default UserSuggestion;
