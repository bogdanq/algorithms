import React from "react";
import { useStore } from "effector-react";
import { renderCanvas } from "./canvas";
import { $algoritms } from "./algoritms/model";
import { setGameStatus, gameStatus } from "./ui/model";
import "./styles.css";

export default function App() {
  const algoritms = useStore($algoritms);

  return (
    <div className="App">
      <div className="select-bar">
        <h2 className="select-bar_title">Select algoritm</h2>
        <ul>
          {algoritms.map((algoritm, index) => (
            <li className={index === 0 ? "isActive" : ""} key={algoritm.name}>
              {algoritm.name}
            </li>
          ))}
        </ul>
        <div className="btn-wrapper">
          <button
            className="btn"
            onClick={() => setGameStatus(gameStatus.START)}
          >
            start
          </button>
          <button
            className="btn"
            onClick={() => setGameStatus(gameStatus.STOP)}
          >
            pause
          </button>
          <button
            className="btn"
            onClick={() => setGameStatus(gameStatus.CLEAR)}
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
}
