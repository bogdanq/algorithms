import React from "react";
import DraggableDefault from "react-draggable";
import styled from "styled-components";
import { createStore, sample, combine } from "effector";
import { TextField } from "@material-ui/core";
import {
  endGame,
  $path,
  setTimer,
  $currentTimer,
  $gameState,
} from "../../../game";
import { useStore } from "effector-react";
import {
  $algoritms,
  selectAlgoritm,
  $currentAlgoritm,
} from "../../../algoritms";
import { CodeArea } from "./code-area";
import { ModalWrapper, SelectBarrierType } from "../molecules";
import { $canMoveDiagonal, changeDirection } from "../../../graph";
import { GameControllButtons } from "./game-controll-buttons";
import { Left, FlexContainer } from "../templates";
import { Switch } from "../atoms";

const $graphState = createStore({});

const $state = combine({
  currentAlgoritm: $currentAlgoritm,
  currentTimer: $currentTimer,
  algoritms: $algoritms,
  canMoveDiagonal: $canMoveDiagonal,
});

sample({
  source: $path,
  clock: endGame,
  target: $graphState,
});

export function RightSideBar() {
  const graphState = useStore($graphState);
  const {
    currentAlgoritm,
    currentTimer,
    algoritms,
    canMoveDiagonal,
  } = useStore($state);
  const [isOpen, setOpen] = React.useState(false);

  return (
    <DraggableDefault>
      <div className="select-bar">
        <h2 className="select-bar_title">Информация:</h2>
        <div className="info-wrapper">
          <h3 className="select-bar_info">
            Количество итераций: <span>{graphState?.count || 0}</span>
          </h3>
          <h3 className="select-bar_info">
            Время прохождения:
            <span> {graphState?.timeEnd?.toFixed(4) || 0} ms</span>
          </h3>
          <h3 className="select-bar_info">
            Длина пути: <span>{graphState?.path?.length || 0}</span>
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
        <GameControllButtons />
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
          <SelectBarrierType />
        </div>
        <CustomAlgoritmModal isOpen={isOpen} setOpen={setOpen} />
      </div>
    </DraggableDefault>
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
