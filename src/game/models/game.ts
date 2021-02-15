import { sample, guard, restore, createDomain, combine } from "effector";
import { AlgoritmController, $searchAlgoritm } from "algoritms";

import { $graph, resetStore, clearCanvas, graphControll } from "../../graph";
import { filtredFps } from "../utils";

export enum GameStatus {
  START = "START",
  RESTART = "RESTART",
  PAUSE = "PAUSE",
  RESUME = "RESUME",
  CLEAR = "CLEAR",
  END_GAME = "END_GAME",
  RESET = "RESET",
}

export type Path = {
  path: number[];
  timeEnd: number;
} & AlgoritmController;

const gameDomain = createDomain("game");

export const setGameStatus = gameDomain.event<GameStatus>();

export const setTimer = gameDomain.event<number>();

export const $path = gameDomain
  .store<Path | null>(null)
  .reset(resetStore, clearCanvas);

export const $currentTimer = gameDomain
  .store<number>(15)
  .on(setTimer, filtredFps);

export const $gameState = restore<GameStatus>(
  setGameStatus,
  GameStatus.RESET
).reset(resetStore);

export const startGame = guard<GameStatus>({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.START),
});

export const resumeGame = guard<GameStatus>({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.RESUME),
});

export const endGame = guard<GameStatus>({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.END_GAME),
});

guard({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.CLEAR),
  target: resetStore,
});

guard({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.START),
  target: clearCanvas,
});

sample({
  source: combine({
    graph: $graph,
    algoritm: $searchAlgoritm,
  }),
  clock: startGame,
  target: $path,
  fn: ({ graph, algoritm }) => {
    if (!algoritm) {
      return {};
    }

    const [start, end] = graph.startEndPosition;

    const time = window.performance.now();
    const result = algoritm.searchFunction(
      start,
      end,
      graph.graph,
      graphControll
    );
    const timeEnd = window.performance.now() - time;

    return {
      ...result,
      timeEnd: timeEnd.toFixed(4) || 0,
    };
  },
});
