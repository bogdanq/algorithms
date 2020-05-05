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
import { sample, createStore, createEvent } from "effector";

import { InfoDraggable } from "./gui/ui/organisms/info-block";
import { FlexContainer, Left } from "./gui/ui/containers";
import { $canMoveDiagonal, changeDirection } from "./graph";
import { GrResume, GrClear, GrPlay, GrPause } from "react-icons/gr";
import { Button, Switch } from "./gui/ui/atoms";
import { TextField } from "@material-ui/core";
import { CodeArea } from "./gui/ui/organisms/code-area";
import { ModalWrapper } from "./gui/ui/molecules";

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
  const canMoveDiagonal = useStore($canMoveDiagonal);
  const [isOpen, setOpen] = React.useState(false);

  return (
    <div className="App">
      <Draggable disabled>
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
                onClick={() => {
                  selectAlgoritm(algoritm.name);
                  if (algoritm.modal) {
                    setOpen(true);
                  }
                }}
                className={currentAlgoritm === algoritm.name ? "isActive" : ""}
                key={algoritm.name}
              >
                {algoritm.name}
              </li>
            ))}
          </ul>
          <div className="btn-wrapper">
            {checkGameStatus(gameState, [
              gameStatus.START,
              gameStatus.PAUSE,
              gameStatus.RESUME,
            ]) ? (
              !checkGameStatus(gameState, [gameStatus.PAUSE]) ? (
                <Button
                  onClick={() => setGameStatus(gameStatus.PAUSE)}
                  icon={GrPause}
                >
                  Пауза
                </Button>
              ) : (
                <Button
                  onClick={() => setGameStatus(gameStatus.RESUME)}
                  icon={GrResume}
                >
                  Продолжить
                </Button>
              )
            ) : (
              <Button
                onClick={() => setGameStatus(gameStatus.START)}
                icon={GrPlay}
              >
                Старт
              </Button>
            )}
            <Button
              onClick={() => setGameStatus(gameStatus.CLEAR)}
              icon={GrClear}
            >
              Очистить
            </Button>
          </div>
          <div className="info-wrapper" style={{ borderTop: "2px solid #fff" }}>
            <FlexContainer>
              <Left>
                <TextField
                  type="number"
                  value={currentTimer}
                  onChange={({ target }) => {
                    setTimer(parseInt(target.value));
                  }}
                />
              </Left>
              <h3 className="select-bar_info">Скорость</h3>
            </FlexContainer>

            <Switch
              checked={canMoveDiagonal}
              onChange={changeDirection}
              label="Проход по диагонали"
            />
          </div>
        </div>
      </Draggable>
      <InfoDraggable />

      <CustomAlgoritmModal isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
}

const CustomAlgoritmModal = ({ isOpen, setOpen }) => {
  return (
    <ModalWrapper
      width={700}
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
    >
      <CodeArea onRequestClose={() => setOpen(false)} />
    </ModalWrapper>
  );
};
