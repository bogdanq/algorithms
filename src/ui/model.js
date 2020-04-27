import { sample, guard, restore, forward, createDomain } from "effector";
import { $graph, resetStore, clearCanvas } from "../graph";
import { $searchAlgoritm } from "../algoritms/model";
import { canvasControl } from "../control-canvas";

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
export const setEndGame = gameDomain.event();

export const $path = gameDomain.store([]).reset(resetStore, clearCanvas);
export const $gameIsEnd = gameDomain
  .store(false)
  .on(setEndGame, () => true)
  .reset(resetStore, clearCanvas);

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

guard({
  source: $gameState,
  filter: $gameState.map((state) => state === gameStatus.END_GAME),
  target: setEndGame,
});

// guardTarget($source, [
//   [(state) => state === 1, event],
//   [(state) => state === 2, another]
// ])

// function guardTarget(source, guards) {}

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

    return algoritm.searchFunction(start, end, graph.graph);
  },
});
