import React from "react";
import DraggableDefault from "react-draggable";
import { combine } from "effector";
import { useStore } from "effector-react";
import { TextField } from "@material-ui/core";
import { setTimer, $currentTimer } from "../../../game";
import { $canMoveDiagonal, changeDirection } from "../../../graph";
import { SelectBarrierType } from "../molecules";
import { Left, FlexContainer } from "../templates";
import { Switch } from "../atoms";
import { GameControllButtons } from "./game-controll-buttons";
import { AlgotitmResult } from "./algoritm-result";
import { AlgoritmsBlock } from "./algoritms";

const $state = combine({
  currentTimer: $currentTimer,
  canMoveDiagonal: $canMoveDiagonal,
});

export function RightSideBar() {
  const { currentTimer, canMoveDiagonal } = useStore($state);

  return (
    <DraggableDefault>
      <div className="select-bar">
        <h2 className="select-bar_title">Информация:</h2>
        <AlgotitmResult />
        <AlgoritmsBlock />
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
      </div>
    </DraggableDefault>
  );
}
