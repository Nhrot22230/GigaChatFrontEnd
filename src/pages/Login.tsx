import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIConsumer from "../api/APIConsumer";
import { Usuario } from "../interfaces/types";
import DEFAULT_USER from "../constants/default";
import "../styles/Login.css";

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="error-display">
      <p>{message}</p>
    </div>
  );
};

interface AuthBoxProps {
  navigate: ReturnType<typeof useNavigate>;
  onError: (value: string | null) => void;
}

const LoginBox: React.FC<AuthBoxProps> = ({ navigate, onError }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    const result = await APIConsumer.authenticate({
      username: name,
      password: pass,
    });
    if (result) {
      sessionStorage.setItem("usuario", JSON.stringify(result));
      await APIConsumer.connect();
      navigate("/giga-chat");
    } else {
      onError("Invalid username or password");
      setTimeout(() => onError(null), 1500);
    }
    setPass("");
  };

  return (
    <div className="auth-box">
      <h1>Login</h1>
      <div className="form">
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your username"
          className="input"
        />
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          id="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="Enter your password"
          className="input"
        />
        <button onClick={handleLogin} className="button">
          Login
        </button>
      </div>
    </div>
  );
};

const RegisterBox: React.FC<AuthBoxProps> = ({ navigate, onError }) => {
  const [usuario, setUsuario] = useState<Usuario>(DEFAULT_USER);
  const [pass, setPass] = useState("");

  const handleRegister = async () => {
    const result = await APIConsumer.register(usuario, pass);
    if (result) {
      const data = JSON.stringify(result);
      console.log(data);
      sessionStorage.setItem("usuario", data);
      await APIConsumer.connect();
      navigate("/giga-chat");
    } else {
      onError("Invalid username or password");
      setTimeout(() => onError(null), 1500);
    }
  };

  return (
    <div className="auth-box">
      <h1>Register</h1>
      <div className="form">
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="name"
          value={usuario.username}
          onChange={(e) => setUsuario({ ...usuario, username: e.target.value })}
          placeholder="Enter your username"
          className="input"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={usuario.email}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          placeholder="Enter your email"
          className="input"
        />
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          id="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
          placeholder="Enter your password"
          className="input"
        />
        <button onClick={handleRegister} className="button">
          Register
        </button>
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="container">
      {error && <ErrorDisplay message={error} />}
      {isRegister ? (
        <RegisterBox navigate={navigate} onError={setError} />
      ) : (
        <LoginBox navigate={navigate} onError={setError} />
      )}
      <div className="switch">
        <a href="#" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account?" : "New here?"}
        </a>
      </div>
    </div>
  );
};

export default Login;
