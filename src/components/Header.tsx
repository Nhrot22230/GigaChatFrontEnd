import React from "react";
import UserCard from "../components/UserCard";
import { Usuario } from "../interfaces/types";
import "../styles/Header.css";

interface HeaderProps {
  usuario: Usuario;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ usuario, handleLogout }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-logo">GigaChat</h1>
        <div className="header-actions">
          <UserCard usuario={usuario} />
          <button className="header-logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
