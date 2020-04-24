import { createEvent, createStore, sample, guard, restore } from "effector";
import { $graph } from "../model";
import { breadthFirstSearch } from "../algoritms/bred-first-search";
import { $searchAlgoritm } from "../algoritms/model";

export const gameStatus = {
  START: "START",
  PAUSE: "PAUSE",
  STOP: "STOP",
};

export const setGameStatus = createEvent();

export const $path = createStore([]);
const $gameState = restore(setGameStatus, gameStatus.STOP);
export const $isValidGameState = $gameState.map(
  (state) => state === gameStatus.START
);

const startGame = guard({
  source: $gameState,
  filter: $isValidGameState,
});

sample({
  source: {
    graph: $graph,
    algoritms: $searchAlgoritm,
  },
  clock: startGame,
  target: $path,
  fn: ({ graph, algoritms }) => {
    const [start, end] = graph.startEndPosition;

    return algoritms(start, end, graph.graph);
  },
});
