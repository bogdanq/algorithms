import {
  combine,
  createDomain,
  sample,
  guard,
  restore,
  Event,
  Store,
} from "effector";
import { startPosition, endPosition, BarrierType } from "../config";
import { graphControll, GraphType } from "./controller";
import {
  setBarrierToGraph,
  setStartPositionToGraph,
  setEndPositionToGraph,
} from "./utils";
import { BarierItem } from "./barrier";

export type CombidenGraphType = {
  graph: GraphType;
  barrier: BarierItem[];
  barrierType: string;
  startEndPosition: [number, number];
  canMoveDiagonal: boolean;
};

const graphDomain = createDomain("graph");

export const resetStore: Event<void> = graphDomain.event();

export const clearCanvas: Event<void> = graphDomain.event();

export const changeDirection: Event<void> = graphDomain.event();

export const setBarrierType: Event<string> = graphDomain.event();

export const setBarrier: Event<{
  index: number;
  barrierType: BarrierType;
}> = graphDomain.event();

export const removeBarrierItem: Event<number> = graphDomain.event();

export const triggerStartPosition: Event<number> = graphDomain.event();

export const triggerEndPosition: Event<number> = graphDomain.event();

export const $startEndPosition: Store<[number, number]> = graphDomain.store([
  startPosition,
  endPosition,
]);

export const $canMoveDiagonal: Store<boolean> = graphDomain.store(false);

export const $barrierType: Store<string> = restore(
  setBarrierType,
  BarrierType.BARIER
);

export const $barriers: Store<Array<BarierItem>> = graphDomain.store([]);

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

removedBarrier.watch((barrier: BarierItem) => barrier.remove());

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
