import React, { useState } from "react";
import "./App.css";
import FetchDataComponent from "./services/ListUsers";

const App: React.FC = () => {
  const [text, setText] = useState<string>("");

  return (
    <>
      <h1>Users</h1>
      <label>
        Search:
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <FetchDataComponent search={text} />
    </>
  );
};

export default App;
