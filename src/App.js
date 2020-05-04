import React from "react";
import { useStore } from "effector-react";
import Draggable from "react-draggable";
import { renderCanvas } from "./canvas";
import {
  setGameStatus,
  gameStatus,
  $gameState,
  $path,
  endGame,
  $currentTimer,
  setTimer,
  checkGameStatus,
} from "./game";
import {
  $algoritms,
  selectAlgoritm,
  $currentAlgoritm,
} from "./algoritms/model";

import "./styles.css";
import { sample, createStore, guard } from "effector";

const $store = createStore({});

sample({
  source: $path,
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
      <Draggable>
        <div className="select-bar">
          <h2 className="select-bar_title">Информация:</h2>
          <div className="info-wrapper">
            <h3 className="select-bar_info">
              Количество итераций: <span>{store?.count || 0}</span>
            </h3>
            <h3 className="select-bar_info">
              Время прохождения:
              <span> {store?.timeEnd?.toFixed(4) || 0} ms</span>
            </h3>
            <h3 className="select-bar_info">
              Длина пути: <span>{store?.path?.length || 0}</span>
            </h3>
          </div>
          <h2 className="select-bar_title">Выбирите алгоритм:</h2>
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
              Старт
            </button>
            {checkGameStatus(gameState, [
              gameStatus.START,
              gameStatus.PAUSE,
              gameStatus.RESUME,
            ]) && (
              <>
                <button
                  className="btn"
                  onClick={() => setGameStatus(gameStatus.PAUSE)}
                >
                  Пауза
                </button>

                <button
                  className="btn"
                  onClick={() => setGameStatus(gameStatus.RESUME)}
                >
                  Продолжить
                </button>
              </>
            )}

            <button
              className="btn"
              onClick={() => setGameStatus(gameStatus.CLEAR)}
            >
              Очистить
            </button>
          </div>

          <div className="info-wrapper">
            <h3 className="select-bar_info">
              Скорость: <span>{currentTimer}</span>
            </h3>
            <input
              type="number"
              value={currentTimer}
              max="20"
              min="1"
              maxLength="2"
              onChange={({ target }) => {
                setTimer(parseInt(target.value));
              }}
            />
          </div>
        </div>
      </Draggable>
    </div>
  );
}
