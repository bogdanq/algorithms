import { sample, guard, restore, forward, createDomain } from "effector";
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
export const setEndGame = gameDomain.event();

export const $path = gameDomain.store([]).reset(resetStore, clearCanvas);
export const $gameIsEnd = gameDomain
  .store(false)
  .on(setEndGame, () => true)
  .reset(resetStore, clearCanvas);

export const $gameState = restore(setGameStatus, gameStatus.END_GAME).reset(
  resetStore
);

export const $isValidGameState = $gameState.map(
  (state) => state === gameStatus.START
);

export const $clearGameState = $gameState.map(
  (state) => state === gameStatus.CLEAR
);

export const $endGameState = $gameState.map(
  (state) => state === gameStatus.END_GAME
);

export const startGame = guard({
  source: $gameState,
  filter: $isValidGameState,
});

const clearGame = guard({
  source: $gameState,
  filter: $clearGameState,
});

const endGame = guard({
  source: $gameState,
  filter: $endGameState,
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

forward({
  from: endGame,
  to: setEndGame,
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

    return algoritm.searchFunction(start, end, graph.graph);
  },
});
