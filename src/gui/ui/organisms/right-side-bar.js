import React from "react";
import DraggableDefault from "react-draggable";
import { combine } from "effector";
import { TextField } from "@material-ui/core";
import { setTimer, $currentTimer } from "../../../game";
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
import { AlgotitmResult } from "./algoritm-result";

const $state = combine({
  currentAlgoritm: $currentAlgoritm,
  currentTimer: $currentTimer,
  algoritms: $algoritms,
  canMoveDiagonal: $canMoveDiagonal,
});

export function RightSideBar() {
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
        <AlgotitmResult />
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
