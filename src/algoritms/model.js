import { createStore, combine, createEvent, restore } from "effector";
import { breadthFirstSearch } from "./bred-first-search";
import { depthFirstSearch } from "./depth-first-search";
import { setGameStatus, gameStatus, $gameState, clearPath } from "../ui/model";
import { resetPath } from "../model";

export const selectAlgoritm = createEvent();
export const incrementStep = createEvent();
export const setVertices = createEvent();
export const endProcess = createEvent();

export const $isValidEndProcess = createStore(false).on(endProcess, () => true);

export const $currentAlgoritm = restore(selectAlgoritm, "bredth first search");
export const $traversedVertices = createStore({ index: 0, vertices: {} }).on(
  setVertices,
  (state, payload) => {
    return {
      vertices: { ...state.vertices, [state.index]: payload },
      index: state.index + 1,
    };
  }
);

export const $numberOfPasses = createStore(0).on(
  incrementStep,
  (state) => state + 1
);

export const $algoritState = combine({
  isValidEndProcess: $isValidEndProcess,
  traversedVertices: $traversedVertices,
  numberOfPasses: $numberOfPasses,
});

selectAlgoritm.watch(resetPath);

export const $algoritms = createStore([
  {
    searchFunction: breadthFirstSearch,
    name: "bredth first search",
  },
  {
    searchFunction: depthFirstSearch,
    name: "depth first search",
  },
]);

export const $searchAlgoritm = combine(
  $currentAlgoritm,
  $algoritms,
  (currentAlgoritm, algoritms) =>
    algoritms.find((algoritm) => algoritm.name === currentAlgoritm)
);
