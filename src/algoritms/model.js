import {
  createStore,
  combine,
  createEvent,
  restore,
  createDomain,
} from "effector";
import { breadthFirstSearch } from "./bred-first-search";
import { depthFirstSearch } from "./depth-first-search";
import { clearCanvas, resetStore } from "../graph";
import { setGameStatus, gameStatus } from "../game";

const algoritmsDomain = createDomain();

export const selectAlgoritm = createEvent();

export const $currentAlgoritm = restore(selectAlgoritm, "bredth first search");

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

algoritmsDomain.onCreateStore((store) => store.reset(clearCanvas, resetStore));

selectAlgoritm.watch(() => setGameStatus(gameStatus.END_GAME));
