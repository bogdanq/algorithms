import React from "react";
import { useStore } from "effector-react";
import { GrResume, GrClear, GrPlay, GrPause } from "react-icons/gr";
import {
  GameStatus,
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
        GameStatus.START,
        GameStatus.PAUSE,
        GameStatus.RESUME,
      ]) ? (
        !checkGameStatus(gameState, [GameStatus.PAUSE]) ? (
          <Button
            onClick={() => setGameStatus(GameStatus.PAUSE)}
            icon={GrPause}
          >
            Пауза
          </Button>
        ) : (
          <Button
            onClick={() => setGameStatus(GameStatus.RESUME)}
            icon={GrResume}
          >
            Продолжить
          </Button>
        )
      ) : (
        <Button onClick={() => setGameStatus(GameStatus.START)} icon={GrPlay}>
          Старт
        </Button>
      )}
      <Button onClick={() => setGameStatus(GameStatus.CLEAR)} icon={GrClear}>
        Очистить
      </Button>
    </FlexContainer>
  );
}
