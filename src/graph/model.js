import { combine, createDomain, sample, guard, restore } from "effector";
import { startPosition, endPosition, ceilType } from "../config";
import { graphControll } from "./controller";
import {
  setBarrierToGraph,
  setStartPositionToGraph,
  setEndPositionToGraph,
} from "./utils";
import { BarierItem } from "./barrier";

const graphDomain = createDomain("graph");

export const resetStore = graphDomain.event();
export const clearCanvas = graphDomain.event();

export const changeDirection = graphDomain.event();
export const setBarrierType = graphDomain.event();
export const setBarrier = graphDomain.event();
export const removeBarrierItem = graphDomain.event();

export const triggerStartPosition = graphDomain.event();
export const triggerEndPosition = graphDomain.event();

export const $startEndPosition = graphDomain.store([
  startPosition,
  endPosition,
]);

export const $canMoveDiagonal = graphDomain.store(false);

export const $barrierType = restore(setBarrierType, ceilType.BARIER);

export const $barriers = graphDomain.store([]);

$canMoveDiagonal.on(changeDirection, (state) => !state);

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
  .on(setBarrier, (state, { index, barrierType }) => {
    const barrier = new BarierItem(index, barrierType);

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
  barrierType: $barrierType,
  startEndPosition: $startEndPosition,
  canMoveDiagonal: $canMoveDiagonal,
}).map((state) => {
  const [start, end] = state.startEndPosition;

  const graph = graphControll.createGraph(state.canMoveDiagonal);

  setBarrierToGraph(graph, state.barrier);

  setStartPositionToGraph(graph, start);
  setEndPositionToGraph(graph, end);

  return { ...state, graph: graph.graph };
});
