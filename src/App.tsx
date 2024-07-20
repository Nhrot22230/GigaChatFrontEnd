import React from "react";
import { User } from "./model/myProps";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./views/Login";

const App: React.FC = () => {

  const user: User = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Giga Chat</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {user? 
        <div>
          <p>Welcome {user.nickname}</p>
          <a href="#chat">Chat</a> 
        </div>
        : 
        <Link to="/login">Login</Link>
        }
      </header>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
