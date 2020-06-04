import {
  createStore,
  combine,
  createEvent,
  restore,
  createDomain,
} from "effector";
import { clearCanvas, resetStore, BarierItem } from "../graph";
import { setGameStatus, GameStatus } from "../game";
import { aStar } from "./a-start";
import { breadthFirstSearch } from "./bred-first-search";
import { depthFirstSearch } from "./depth-first-search";
import { dijkstra } from "./dijkstra";

type Algoritms = Array<{
  searchFunction: any;
  name: string;
  modal?: boolean;
}>;

type ProcessedVertex = {
  vertex: null | number;
  siblings: number[];
};

const algoritmsDomain = createDomain("algoritmsDomain");

export const selectAlgoritm = createEvent<string>();

export const addVisitedVertex = createEvent<BarierItem>();

export const addProcessedVertex = createEvent<ProcessedVertex>();

export const addCustomAlgoritm = createEvent<any>();

export const $currentAlgoritm = restore<string>(
  selectAlgoritm,
  "bredth first search"
);

export const $visitedVertex = algoritmsDomain.store<Array<BarierItem>>([]);

export const $processedVertex = algoritmsDomain.store<ProcessedVertex>({
  vertex: null,
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

$visitedVertex.on(addVisitedVertex, (state, vertex) => [...state, vertex]);

$processedVertex.on(addProcessedVertex, (_, processed) => processed);

algoritmsDomain.onCreateStore((store) => store.reset(clearCanvas, resetStore));

selectAlgoritm.watch(() => setGameStatus(GameStatus.RESET));
