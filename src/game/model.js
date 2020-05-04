import { sample, guard, restore, createDomain } from "effector";
import { $graph, resetStore, clearCanvas } from "../graph";
import { $searchAlgoritm } from "../algoritms/model";

export const gameStatus = {
  START: "START",
  RESTART: "RESTART",
  PAUSE: "PAUSE",
  RESUME: "RESUME",
  CLEAR: "CLEAR",
  END_GAME: "END_GAME",
};

const gameDomain = createDomain("game");

export const setGameStatus = gameDomain.event();
export const setTimer = gameDomain.event();

export const $path = gameDomain.store({}).reset(resetStore, clearCanvas);
export const $currentTimer = restore(setTimer, 16).reset(resetStore);

export const $gameState = restore(setGameStatus, gameStatus.END_GAME).reset(
  resetStore
);

export const startGame = guard({
  source: $gameState,
  filter: $gameState.map((state) => state === gameStatus.START),
});

export const resumeGame = guard({
  source: $gameState,
  filter: $gameState.map((state) => state === gameStatus.RESUME),
});

guard({
  source: $gameState,
  filter: $gameState.map((state) => state === gameStatus.CLEAR),
  target: resetStore,
});

guard({
  source: $gameState,
  filter: $gameState.map((state) => state === gameStatus.START),
  target: clearCanvas,
});

export const endGame = guard({
  source: $gameState,
  filter: $gameState.map((state) => state === gameStatus.END_GAME),
});

sample({
  source: {
    graph: $graph,
    algoritm: $searchAlgoritm,
  },
  clock: startGame,
  target: $path,
  fn: ({ graph, algoritm }) => {
    const [start, end] = graph.startEndPosition;

    const time = window.performance.now();

    const result = algoritm.searchFunction(start, end, graph.graph);

    const timeEnd = window.performance.now() - time;

    return {
      ...result,
      timeEnd,
    };
  },
});
