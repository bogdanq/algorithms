import { combine, createDomain, sample, guard } from "effector";
import { startPosition, endPosition } from "../config";
import { graphControll } from "./controller";
import {
  setBarrierToGraph,
  setStartPositionToGraph,
  setEndPositionToGraph,
} from "./utils";
import { Barier } from "../ui";

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

export const $barriers = graphDomain.store([]);

graphDomain.onCreateStore((store) => store.reset(resetStore));

export const removedBarrier = guard({
  source: sample({
    source: $barriers,
    clock: removeBarrierItem,
    fn: (state, index) => state.find((item) => item.getIndex() === index),
  }),
  filter: Boolean,
});

removedBarrier.watch((item) => item.remove());

$barriers
  .on(setBarrier, (state, index) => {
    const barrier = new Barier(index);

    const isFindIndex = state.find((item) => item.getIndex() === index);

    return isFindIndex ? state : [...state, barrier];
  })
  .on(removedBarrier, (state, removed) =>
    state.filter((item) => item !== removed)
  );

$startEndPosition
  .on(triggerStartPosition, (state, index) => [index, state[1]])
  .on(triggerEndPosition, (state, index) => [state[0], index]);

export const $graph = combine({
  barrier: $barriers,
  startEndPosition: $startEndPosition,
}).map((state) => {
  const [start, end] = state.startEndPosition;

  const graph = graphControll.createGraph();

  setBarrierToGraph(graph, state.barrier);
  setStartPositionToGraph(graph, start);
  setEndPositionToGraph(graph, end);

  return { ...state, graph: graph.graph };
});
