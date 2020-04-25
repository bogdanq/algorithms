import {
  createEvent,
  createStore,
  sample,
  guard,
  restore,
  forward,
  merge,
} from "effector";
import { $graph, resetStore, resetPath } from "../model";
import { breadthFirstSearch } from "../algoritms/bred-first-search";
import { $searchAlgoritm } from "../algoritms/model";

export const gameStatus = {
  START: "START",
  PAUSE: "PAUSE",
  STOP: "STOP",
  CLEAR: "CLEAR",
  RESTART: "RESTART",
  CLEAR_PATH: "CLEAR_PATH",
};

export const setGameStatus = createEvent();

export const $path = createStore([]).reset(resetStore, resetPath);

export const $gameState = restore(setGameStatus, {
  ref: gameStatus.STOP,
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

const clearGame = guard({
  source: $gameState,
  filter: $clearGameState,
});

forward({
  from: clearGame,
  to: resetStore,
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

    return algoritm.searchFunction(start, end, graph.graph);
  },
});
