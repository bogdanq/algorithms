import {
  createEvent,
  createStore,
  sample,
  guard,
  restore,
  forward,
  merge,
} from "effector";
import { $graph, resetStore } from "../model";
import { breadthFirstSearch } from "../algoritms/bred-first-search";
import { $searchAlgoritm } from "../algoritms/model";

export const gameStatus = {
  START: "START",
  PAUSE: "PAUSE",
  STOP: "STOP",
  CLEAR: "CLEAR",
};

export const setGameStatus = createEvent();

export const $path = createStore([]);
export const $gameState = restore(setGameStatus, gameStatus.STOP).reset(
  resetStore
);
export const $isValidGameState = $gameState.map(
  (state) => state === gameStatus.START
);
export const $clearGameState = $gameState.map(
  (state) => state === gameStatus.CLEAR
);

forward({
  from: $clearGameState,
  to: resetStore,
});

const startGame = guard({
  source: $gameState,
  filter: $isValidGameState,
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
