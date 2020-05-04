import {
  sample,
  guard,
  restore,
  createDomain,
  forward,
  combine,
} from "effector";
import {
  $graph,
  resetStore,
  clearCanvas,
  $barriers,
  $startEndPosition,
} from "../graph";
import { $searchAlgoritm } from "../algoritms/model";
import { Barier } from "./barrier";

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
export const setHistoryGame = gameDomain.event();
export const recoveryHistoryGame = gameDomain.event();
export const setCurrentGame = gameDomain.event();

export const $path = gameDomain.store({}).reset(resetStore, clearCanvas);
export const $historyGame = gameDomain.store([]);
export const $currentTimer = restore(setTimer, 16).reset(resetStore);

$historyGame.on(setHistoryGame, (state, { barrier, startEndPosition }) => {
  const [start, end] = startEndPosition;

  return [...state, { barrier, start, end, date: new Date() }];
});

export const $currentGame = restore(setCurrentGame, null).reset(
  resetStore,
  clearCanvas
);

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
  source: $graph,
  clock: endGame,
  target: setHistoryGame,
});

sample({
  source: $historyGame,
  clock: recoveryHistoryGame,
  target: $barriers,
  fn: (historyGame, params) => {
    const findedGame = historyGame.find((game) => game.date === params);
    setCurrentGame(findedGame.date);
    return findedGame.barrier;
  },
});

sample({
  source: $historyGame,
  clock: recoveryHistoryGame,
  target: $startEndPosition,
  fn: (historyGame, params) => {
    const findedGame = historyGame.find((game) => game.date === params);

    return [findedGame.start, findedGame.end];
  },
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
