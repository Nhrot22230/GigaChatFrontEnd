import React, { useEffect, useState } from "react";
import { User } from "../model/myProps";

const Login: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUser(null);
    setError(null);
    fetch("http://localhost:8080/giga-chat/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, password }),
    })
    .then((response) => {
      if (response.status === 404) {
        setError("User not found");
      }
      else if (!response.ok) {
        setError("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setUser(data);
    })
    
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nickname:
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <br />
      </form>
      {error ? <div>Error: {error}</div> : null}
      {user ? <div>Welcome, {user.firstName} {user.lastName} [{user.nickname}]</div> : null}
    </div>
  );
};

export default Login;
