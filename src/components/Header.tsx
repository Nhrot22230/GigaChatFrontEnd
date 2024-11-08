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
        <div style={{ display: "flex", gap: 2, alignItems: "center" }} >
          <img
            style={
              {
                height: 30,
              }}
            src="https://www.shutterstock.com/image-vector/cheerful-funny-cartoon-childrens-robot-600nw-2407552137.jpg" />

          <h1 className="header-logo">CampusBot</h1>
        </div>
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
