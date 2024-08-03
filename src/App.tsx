import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import GigaChat from "./pages/GigaChat";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/giga-chat" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/giga-chat" element={<GigaChat />} />
        <Route path="*" element={<Navigate to="/giga-chat" />} />
      </Routes>
    </Router>
  );
};

export default App;
