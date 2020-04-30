import { sample, guard, restore, forward, createDomain } from "effector";
import { $graph, resetStore, clearCanvas } from "../graph";
import { $searchAlgoritm } from "../algoritms/model";
import { canvasControl } from "../control-canvas";
import { removeDoubleVertex } from "../algoritms";

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

guard({
  source: $gameState,
  filter: $gameState.map((state) => state === gameStatus.CLEAR),
  target: resetStore,
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

    clearCanvas();

    const time = window.performance.now();

    const result = algoritm.searchFunction(start, end, graph.graph);

    const timeEnd = window.performance.now() - time;

    return {
      ...result,
      visited: removeDoubleVertex(result.visited),
      processing: removeDoubleVertex(result.processing),
      timeEnd,
    };
  },
});
