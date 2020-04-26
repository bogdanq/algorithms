import { sample, guard, restore, forward, createDomain } from "effector";
import { $graph, resetStore, clearCanvas } from "../graph";
import { $searchAlgoritm } from "../algoritms/model";
import { gameLoop, clearLoop } from "./loop";

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
export const resumeAnimated = gameDomain.event();
export const pauseAnimated = gameDomain.event();

export const $path = gameDomain.store([]).reset(resetStore, clearCanvas);

export const $gameState = restore(setGameStatus, {
  ref: gameStatus.END_GAME,
}).reset(resetStore);

export const $isValidGameState = $gameState.map(
  (state) => state.ref === gameStatus.START
);

export const $clearGameState = $gameState.map(
  (state) => state.ref === gameStatus.CLEAR
);

export const startGame = guard({
  source: $gameState,
  filter: $isValidGameState,
});
// startGame.watch(clearLoop);

const clearGame = guard({
  source: $gameState,
  filter: $clearGameState,
});

// При остановке игры, нужно полностью очистить состояние приложения
forward({
  from: clearGame,
  to: resetStore,
});

// При старте игры - нужно удалить полностью те елементы канваса, которых нет в графе
forward({
  from: startGame,
  to: clearCanvas,
});

// При старте игры, нужно расчитать путь, взяв данные из состояния
sample({
  source: {
    graph: $graph,
    algoritm: $searchAlgoritm,
  },
  clock: startGame,
  target: $path,
  fn: ({ graph, algoritm }) => {
    const [start, end] = graph.startEndPosition;
    // clearLoop();
    return algoritm.searchFunction(start, end, graph.graph);
  },
});
