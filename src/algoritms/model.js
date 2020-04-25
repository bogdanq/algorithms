import { createStore, combine, createEvent, restore } from "effector";
import { breadthFirstSearch } from "./bred-first-search";
import { depthFirstSearch } from "./depth-first-search";
import { setGameStatus, gameStatus, $gameState, clearPath } from "../ui/model";
import { resetPath } from "../model";

export const selectAlgoritm = createEvent();

export const $currentAlgoritm = restore(selectAlgoritm, "bredth first search");

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
