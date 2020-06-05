import { combine, createDomain, sample, guard, restore } from "effector";
import { startPosition, endPosition, BarrierType } from "../config";
import { graphControll, GraphType } from "./controller";
import {
  setBarrierToGraph,
  setStartPositionToGraph,
  setEndPositionToGraph,
} from "./utils";
import { BarrierItem } from "./barrier";

export type CombidenGraphType = {
  graph: GraphType;
  barrier: BarrierItem[];
  barrierType: BarrierType;
  startEndPosition: [number, number];
  canMoveDiagonal: boolean;
};

const graphDomain = createDomain("graph");

export const resetStore = graphDomain.event();

export const clearCanvas = graphDomain.event();

export const changeDirection = graphDomain.event();

export const setBarrierType = graphDomain.event<string>();

export const setBarrier = graphDomain.event<{
  index: number;
  barrierType: BarrierType;
}>();

export const removeBarrierItem = graphDomain.event<number>();

export const triggerStartPosition = graphDomain.event<number>();

export const triggerEndPosition = graphDomain.event<number>();

export const $startEndPosition = graphDomain.store<[number, number]>([
  startPosition,
  endPosition,
]);

export const $canMoveDiagonal = graphDomain.store(false);

export const $barrierType = restore(setBarrierType, BarrierType.BARIER);

export const $barriers = graphDomain.store<Array<BarrierItem>>([]);

$canMoveDiagonal.on(changeDirection, (state) => !state);

graphDomain.onCreateStore((store) => store.reset(resetStore));

export const removedBarrier = guard({
  source: sample({
    source: $barriers,
    clock: removeBarrierItem,
    fn: (state, index) => state.find((barrier) => barrier.getIndex() === index),
  }),
  filter: Boolean,
});

removedBarrier.watch((barrier: BarrierItem) => barrier.remove());

$barriers
  .on(setBarrier, (state, { index, barrierType }) => {
    const barrier = new BarrierItem(index, barrierType);

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
