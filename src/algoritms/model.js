import { createStore, combine } from "effector";
import { breadthFirstSearch } from "./bred-first-search";

export const $currentAlgoritm = createStore("bredth first search");
export const $algoritms = createStore([
  {
    searchFunction: breadthFirstSearch,
    name: "bredth first search",
  },
  {
    searchFunction: breadthFirstSearch,
    name: "depth first search",
  },
]);

export const $searchAlgoritm = combine(
  $currentAlgoritm,
  $algoritms,
  (currentAlgoritm, algoritms) =>
    algoritms.find((algoritm) => algoritm.name === currentAlgoritm)
);
