import React from "react";
import { useStore } from "effector-react";
import { renderCanvas } from "./canvas";
import {
  setGameStatus,
  gameStatus,
  $gameState,
  resumeAnimated,
  pauseAnimated,
} from "./ui/model";
import {
  $algoritms,
  selectAlgoritm,
  $currentAlgoritm,
} from "./algoritms/model";

import "./styles.css";

export default function App() {
  const algoritms = useStore($algoritms);
  const currentAlgoritm = useStore($currentAlgoritm);

  return (
    <div className="App">
      <div className="select-bar">
        <h2 className="select-bar_title">Select algoritm</h2>
        <ul>
          {algoritms.map((algoritm, index) => (
            <li
              onClick={() => selectAlgoritm(algoritm.name)}
              className={currentAlgoritm === algoritm.name ? "isActive" : ""}
              key={algoritm.name}
            >
              {algoritm.name}
            </li>
          ))}
        </ul>
        <div className="btn-wrapper">
          <button
            className="btn"
            onClick={() => setGameStatus({ ref: gameStatus.START })}
          >
            start
          </button>

          <button
            className="btn"
            onClick={() => setGameStatus({ ref: gameStatus.CLEAR })}
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
}
