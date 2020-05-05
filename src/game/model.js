import { sample, guard, restore, createDomain } from "effector";
import {
  $graph,
  resetStore,
  clearCanvas,
  $barriers,
  $startEndPosition,
} from "../graph";
import { $searchAlgoritm } from "../algoritms/model";
import { equal, filtredFps } from "./utils";

export const gameStatus = {
  START: "START",
  RESTART: "RESTART",
  PAUSE: "PAUSE",
  RESUME: "RESUME",
  CLEAR: "CLEAR",
  END_GAME: "END_GAME",
  RESET: "RESET",
};

const gameDomain = createDomain("game");

export const setGameStatus = gameDomain.event();
export const setTimer = gameDomain.event();
export const setHistoryGame = gameDomain.event();
export const recoveryHistoryGame = gameDomain.event();
export const setCurrentGame = gameDomain.event();

export const $path = gameDomain.store({}).reset(resetStore, clearCanvas);
export const $historyGame = gameDomain.store([]);
export const $currentTimer = gameDomain.store(15).on(setTimer, filtredFps);

$historyGame.on(setHistoryGame, (state, { barrier, startEndPosition }) => {
  const nextGame = { barrier, startEndPosition, date: new Date() };
  const findedGame = equal(state, nextGame);

  return findedGame ? [...state, nextGame] : state;
});

export const $currentGame = restore(setCurrentGame, null).reset(
  resetStore,
  clearCanvas
);

export const $gameState = restore(setGameStatus, gameStatus.RESET).reset(
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

export const endGame = guard({
  source: $gameState,
  filter: $gameState.map((state) => state === gameStatus.END_GAME),
});

const restoredHistoryGame = guard({
  source: recoveryHistoryGame,
  filter: $gameState.map((state) => state === gameStatus.END_GAME),
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

sample({
  source: $graph,
  clock: endGame,
  target: setHistoryGame,
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

sampleForHistoryGame($barriers, "barrier");
sampleForHistoryGame($startEndPosition, "startEndPosition");
sampleForHistoryGame($currentGame, "date");

function sampleForHistoryGame(target, key) {
  return sample({
    source: $historyGame,
    clock: restoredHistoryGame,
    target,
    fn: (historyGame, params) => {
      const findedGame = historyGame.find((game) => game.date === params);

      return findedGame[key];
    },
  });
}
