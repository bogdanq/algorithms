import {
  createStore,
  combine,
  createEvent,
  restore,
  createDomain,
  Store,
  Event,
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

export const selectAlgoritm: Event<string> = createEvent();

export const addVisitedVertex: Event<BarierItem> = createEvent();

export const addProcessedVertex: Event<ProcessedVertex> = createEvent();

export const addCustomAlgoritm: Event<any> = createEvent();

export const $currentAlgoritm: Store<string> = restore(
  selectAlgoritm,
  "bredth first search"
);

export const $visitedVertex: Store<Array<BarierItem>> = algoritmsDomain.store(
  []
);

export const $processedVertex: Store<ProcessedVertex> = algoritmsDomain.store({
  vertex: null,
  siblings: [],
});

export const $algoritms: Store<Algoritms> = createStore([
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
