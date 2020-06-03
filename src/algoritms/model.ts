import {
  createStore,
  combine,
  createEvent,
  restore,
  createDomain,
} from "effector";
import { breadthFirstSearch } from "./bred-first-search";
import { depthFirstSearch } from "./depth-first-search";
import { dijkstra } from "./dijkstra";
import { clearCanvas, resetStore } from "../graph";
import { setGameStatus, gameStatus } from "../game";
import { aStar } from "./a-start";

const algoritmsDomain = createDomain();

export const selectAlgoritm = createEvent();
export const addVisitedVertex = createEvent();
export const addProcessedVertex = createEvent();
export const addCustomAlgoritm = createEvent();

export const $currentAlgoritm = restore(selectAlgoritm, "bredth first search");
export const $visitedVertex = algoritmsDomain.store([]);
export const $processedVertex = algoritmsDomain.store({
  vertex: null,
  siblings: [],
});

$visitedVertex.on(addVisitedVertex, (state, vertex) => [...state, vertex]);
$processedVertex.on(addProcessedVertex, (_, processed) => processed);

export const $algoritms = createStore([
  {
    searchFunction: breadthFirstSearch,
    name: "bredth first search",
  },
  {
    searchFunction: depthFirstSearch,
    name: "depth first search",
  },
  {
    searchFunction: dijkstra,
    name: "dijkstra",
  },
  {
    searchFunction: aStar,
    name: "a-star",
  },
  {
    searchFunction: null,
    name: "custom function",
    modal: true,
  },
]).on(addCustomAlgoritm, (state, foo) =>
  state.map((algoritm) =>
    algoritm.name === "custom function"
      ? { ...algoritm, searchFunction: foo }
      : algoritm
  )
);

export const $searchAlgoritm = combine(
  $currentAlgoritm,
  $algoritms,
  (currentAlgoritm, algoritms) =>
    algoritms.find((algoritm) => algoritm.name === currentAlgoritm)
);

algoritmsDomain.onCreateStore((store) => store.reset(clearCanvas, resetStore));

selectAlgoritm.watch(() => setGameStatus(gameStatus.RESET));
