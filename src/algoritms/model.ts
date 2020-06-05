import {
  createStore,
  combine,
  createEvent,
  restore,
  createDomain,
} from "effector";
import { clearCanvas, resetStore } from "../graph";
import { setGameStatus, GameStatus } from "../game";
import { aStar } from "./a-start";
import { breadthFirstSearch } from "./bred-first-search";
import { depthFirstSearch } from "./depth-first-search";
import { dijkstra } from "./dijkstra";

export type AlgoritmName =
  | "bredth first search"
  | "depth first search"
  | "dijkstra"
  | "a-star"
  | "custom function";

export type Algoritms = Array<{
  searchFunction: any;
  name: AlgoritmName;

  modal?: boolean;
}>;

export type ProcessedVertex = {
  vertex: number;
  siblings: Array<number>;
};

const algoritmsDomain = createDomain("algoritmsDomain");

export const selectAlgoritm = createEvent<AlgoritmName>();

export const addVisitedVertex = createEvent<number>();

export const addProcessedVertex = createEvent<ProcessedVertex>();

export const addCustomAlgoritm = createEvent<any>();

export const $currentAlgoritm = restore<AlgoritmName>(
  selectAlgoritm,
  "bredth first search"
);

export const $visitedVertex = algoritmsDomain.store<Array<number>>([]);

export const $processedVertex = algoritmsDomain.store<ProcessedVertex>({
  vertex: 0,
  siblings: [],
});

export const $algoritms = createStore<Algoritms>([
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
]);

export const $searchAlgoritm = combine(
  $currentAlgoritm,
  $algoritms,
  (currentAlgoritm, algoritms) =>
    algoritms.find((algoritm) => algoritm.name === currentAlgoritm)
);

$algoritms.on(addCustomAlgoritm, (state, foo) =>
  state.map((algoritm) =>
    algoritm.name === "custom function"
      ? { ...algoritm, searchFunction: foo }
      : algoritm
  )
);

$visitedVertex.on(addVisitedVertex, (state, vertex) => [...state, vertex]);

$processedVertex.on(addProcessedVertex, (_, processed) => processed);

algoritmsDomain.onCreateStore((store) => store.reset(clearCanvas, resetStore));

selectAlgoritm.watch(() => setGameStatus(GameStatus.RESET));
