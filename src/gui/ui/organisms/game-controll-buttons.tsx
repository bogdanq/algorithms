import React from "react";
import { useStore } from "effector-react";
import { GrResume, GrClear, GrPlay, GrPause } from "react-icons/gr";
import {
  gameStatus,
  setGameStatus,
  $gameState,
  checkGameStatus,
} from "../../../game";
import { Button } from "../atoms";
import { FlexContainer } from "../templates";

export function GameControllButtons() {
  const gameState = useStore($gameState);

  return (
    <FlexContainer justify="space-around">
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
        <Button onClick={() => setGameStatus(gameStatus.START)} icon={GrPlay}>
          Старт
        </Button>
      )}
      <Button onClick={() => setGameStatus(gameStatus.CLEAR)} icon={GrClear}>
        Очистить
      </Button>
    </FlexContainer>
  );
}
