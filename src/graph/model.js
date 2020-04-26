import { combine, createDomain } from "effector";
import { startPosition, endPosition } from "../config";
import { graphControll } from "./controller";
import {
  setBarrierToGraph,
  setStartPositionToGraph,
  setEndPositionToGraph,
} from "./utils";

const graphDomain = createDomain("graph");

export const resetStore = graphDomain.event();
export const clearCanvas = graphDomain.event();

export const setBarrier = graphDomain.event();
export const removeBarrierItem = graphDomain.event();

export const triggerStartPosition = graphDomain.event();
export const triggerEndPosition = graphDomain.event();

export const $startEndPosition = graphDomain.store([
  startPosition,
  endPosition,
]);

export const $barrier = graphDomain.store([]);

graphDomain.onCreateStore((store) => store.reset(resetStore));

$barrier
  .on(setBarrier, (state, index) => {
    const isFindIndex = state.includes(index);

    return isFindIndex ? state : [...state, index];
  })
  .on(removeBarrierItem, (state, index) =>
    state.filter((item) => item !== index)
  );

$startEndPosition
  .on(triggerStartPosition, (state, index) => [index, state[1]])
  .on(triggerEndPosition, (state, index) => [state[0], index]);

export const $graph = combine({
  barrier: $barrier,
  startEndPosition: $startEndPosition,
}).map((state) => {
  const [start, end] = state.startEndPosition;

  const graph = graphControll.createGraph();

  setBarrierToGraph(graph, state.barrier);
  setStartPositionToGraph(graph, start);
  setEndPositionToGraph(graph, end);

  return { ...state, graph: graph.graph };
});

$graph.watch(clearCanvas);
