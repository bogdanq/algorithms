import { createStore, combine } from "effector";
import { breadthFirstSearch } from "./bred-first-search";

export const $currentAlgoritm = createStore("bfs");
export const $algoritms = createStore({
  bfs: breadthFirstSearch,
});

export const $searchAlgoritm = combine(
  $currentAlgoritm,
  $algoritms,
  (currentAlgoritm, algoritms) => algoritms[currentAlgoritm]
);
