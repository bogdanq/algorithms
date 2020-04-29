import React from "react";
import { useStore } from "effector-react";
import { renderCanvas } from "./canvas";
import {
  setGameStatus,
  gameStatus,
  $gameState,
  $path,
  endGame,
  $currentTimer,
  setTimer,
} from "./ui/model";
import {
  $algoritms,
  selectAlgoritm,
  $currentAlgoritm,
  $numberOfIterations,
} from "./algoritms/model";

import "./styles.css";
import { checkGameStatus } from "./ui/utils";
import { sample, createStore, guard } from "effector";

const $store = createStore({});

sample({
  source: {
    numberOfIterations: $numberOfIterations,
    path: $path,
  },
  clock: endGame,
  target: $store,
});

export default function App() {
  const algoritms = useStore($algoritms);
  const currentAlgoritm = useStore($currentAlgoritm);
  const gameState = useStore($gameState);
  const store = useStore($store);
  const currentTimer = useStore($currentTimer);

  return (
    <div className="App">
      <div className="select-bar">
        <h2 className="select-bar_title">Select algoritm</h2>
        <h3 className="select-bar_title">
          Количество итераций: {store?.numberOfIterations || 0}
        </h3>
        <h3 className="select-bar_title">
          Время прохождения: {store?.path?.timeEnd?.toFixed(4) || 0} ms
        </h3>
        <h3 className="select-bar_title">
          Длина пути: {store?.path?.path?.length || 0}
        </h3>
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
            onClick={() => setGameStatus(gameStatus.START)}
          >
            start
          </button>
          {checkGameStatus(
            gameState,
            gameStatus.START,
            gameStatus.PAUSE,
            gameStatus.RESUME
          ) && (
            <>
              <button
                className="btn"
                onClick={() => setGameStatus(gameStatus.PAUSE)}
              >
                pause
              </button>

              <button
                className="btn"
                onClick={() => setGameStatus(gameStatus.RESUME)}
              >
                resume
              </button>
            </>
          )}

          <button
            className="btn"
            onClick={() => setGameStatus(gameStatus.CLEAR)}
          >
            clear
          </button>
        </div>

        <h3 className="select-bar_title">Скорость: {currentTimer}</h3>
        <input
          type="range"
          value={currentTimer}
          min="1"
          max="20"
          onChange={(e) => setTimer(e.target.value)}
        />
      </div>
    </div>
  );
}
