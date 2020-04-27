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
import { setGameStatus, gameStatus } from "../ui/model";

const algoritmsDomain = createDomain();

export const selectAlgoritm = createEvent();
export const incrementStep = createEvent();
export const setVertex = createEvent();
export const setDrowAnimated = createEvent();

export const $canDrowAnimated = algoritmsDomain
  .store(false)
  .on(setDrowAnimated, () => true);

export const $currentAlgoritm = restore(selectAlgoritm, "bredth first search");
export const $traversedVertexes = algoritmsDomain
  .store([])
  .on(setVertex, (vertexes, vertex) => {
    return [...vertexes, vertex];
  });

export const $stepCounter = algoritmsDomain
  .store(0)
  .on(incrementStep, (state) => state + 1);

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

export const createLogger = () => {
  return {
    setDrowAnimated,
    setVertex: (vertex) => {
      setVertex(vertex);
      incrementStep();
    },
  };
};

algoritmsDomain.onCreateStore((store) => store.reset(clearCanvas, resetStore));

selectAlgoritm.watch(() => {
  // clearCanvas();
  setGameStatus(gameStatus.END_GAME);
});
