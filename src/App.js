import React from "react";
import "./styles.css";
import { renderCanvas } from "./canvas";
import { setGameStatus, gameStatus } from "./ui/model";
// setGameStatus

// setGameStatus(gameStatus.START);
export default function App() {
  return (
    <div className="App">
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "250px",
          height: "150px",
          border: "1px solid red",
          background: "#fff",
        }}
      >
        <button onClick={() => setGameStatus(gameStatus.START)}>start</button>
        <button onClick={() => setGameStatus(gameStatus.STOP)}>stop</button>
      </div>
    </div>
  );
}
