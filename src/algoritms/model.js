import {
  createStore,
  combine,
  createEvent,
  restore,
  createDomain,
} from "effector";
import { breadthFirstSearch } from "./bred-first-search";
import { depthFirstSearch } from "./depth-first-search";
import { resetPath, resetStore } from "../graph";
import { ceilType } from "../config";

const algoritmsDomain = createDomain();

export const selectAlgoritm = createEvent();
export const incrementStep = createEvent();
export const setVertices = createEvent();
export const endProcess = createEvent();

export const $isValidEndProcess = algoritmsDomain
  .store(false)
  .on(endProcess, () => true);

export const $currentAlgoritm = restore(selectAlgoritm, "bredth first search");
export const $traversedVertices = algoritmsDomain
  .store([])
  .on(setVertices, (state, payload) => {
    return [...state, payload];
  });

export const $numberOfPasses = algoritmsDomain
  .store(0)
  .on(incrementStep, (state) => state + 1);

algoritmsDomain.onCreateStore((store) => store.reset(resetPath, resetStore));

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

export const canVisitedVertex = (vertex) => {
  if (vertex.type !== ceilType.BARIER) {
    return true;
  }
  return false;
};

export const $searchAlgoritm = combine(
  $currentAlgoritm,
  $algoritms,
  (currentAlgoritm, algoritms) =>
    algoritms.find((algoritm) => algoritm.name === currentAlgoritm)
);
