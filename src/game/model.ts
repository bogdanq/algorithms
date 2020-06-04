import { sample, guard, restore, createDomain, combine, Event } from "effector";
import _ from "lodash";
import {
  $graph,
  resetStore,
  clearCanvas,
  $barriers,
  $startEndPosition,
} from "../graph";
import { $searchAlgoritm, $currentAlgoritm } from "../algoritms/model";
import { graphControll } from "../graph/controller";
import { filtredFps } from "./utils";

export enum GameStatus {
  START = "START",
  RESTART = "RESTART",
  PAUSE = "PAUSE",
  RESUME = "RESUME",
  CLEAR = "CLEAR",
  END_GAME = "END_GAME",
  RESET = "RESET",
}

const gameDomain = createDomain("game");

export const setGameStatus: Event<GameStatus> = gameDomain.event();
export const setTimer = gameDomain.event();
export const setHistoryGame = gameDomain.event();
export const recoveryHistoryGame = gameDomain.event();
export const setCurrentGame = gameDomain.event();

export const $path = gameDomain.store({}).reset(resetStore, clearCanvas);
export const $historyGame = gameDomain.store([]);
export const $currentTimer = gameDomain.store(15).on(setTimer, filtredFps);

const $stateForRecoverHistory = combine({
  path: $path,
  currentAlgoritm: $currentAlgoritm,
  graph: $graph,
});

$historyGame.on(
  setHistoryGame,
  (
    state,
    {
      currentAlgoritm,
      path: { count, path, timeEnd },
      graph: { barrier, startEndPosition },
    }
  ) => {
    const nextGame = {
      barrier,
      startEndPosition,
      currentAlgoritm,
      index: timeEnd.toFixed(1) + currentAlgoritm,
      timeEnd: timeEnd.toFixed(1),
      path,
      count,
    };

    const findedGame = _.find(state, nextGame);

    return findedGame ? state : [...state, nextGame];
  }
);

export const $currentGame = restore(setCurrentGame, null).reset(resetStore);

export const $gameState = restore(setGameStatus, GameStatus.RESET).reset(
  resetStore
);

export const startGame = guard({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.START),
});

export const resumeGame = guard({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.RESUME),
});

export const endGame = guard({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.END_GAME),
});

const restoredHistoryGame = guard({
  source: recoveryHistoryGame,
  filter: $gameState.map(
    (state) => state === GameStatus.END_GAME || state === GameStatus.RESET
  ),
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
  source: $stateForRecoverHistory,
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
    const result = algoritm.searchFunction(
      start,
      end,
      graph.graph,
      graphControll
    );
    const timeEnd = window.performance.now() - time;

    return {
      ...result,
      timeEnd,
    };
  },
});

sampleForHistoryGame($barriers, "barrier");
sampleForHistoryGame($startEndPosition, "startEndPosition");
sampleForHistoryGame($currentGame, "index");
sampleForHistoryGame($currentAlgoritm, "currentAlgoritm");

function sampleForHistoryGame(target, key) {
  return sample({
    source: $historyGame,
    clock: restoredHistoryGame,
    target,
    fn: (historyGame, index) => {
      const findedGame = historyGame.find((game) => game.index === index);

      return findedGame[key];
    },
  });
}
