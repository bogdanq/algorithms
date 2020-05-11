import { combine, createDomain, sample, guard } from "effector";
import { startPosition, endPosition, ceilType } from "../config";
import { graphControll } from "./controller";
import {
  setBarrierToGraph,
  setStartPositionToGraph,
  setEndPositionToGraph,
  setWaterToGraph,
} from "./utils";
import { Barier } from "../game";

const graphDomain = createDomain("graph");

export const resetStore = graphDomain.event();
export const clearCanvas = graphDomain.event();

export const changeDirection = graphDomain.event();
export const setBarrier = graphDomain.event();
export const removeBarrierItem = graphDomain.event();

export const triggerStartPosition = graphDomain.event();
export const triggerEndPosition = graphDomain.event();

export const $startEndPosition = graphDomain.store([
  startPosition,
  endPosition,
]);

export const $canMoveDiagonal = graphDomain.store(false);

export const $barrierType = graphDomain.store(ceilType.WATER);
export const $barriersList = graphDomain.store({
  [ceilType.BARIER]: [],
  [ceilType.WATER]: [],
});

export const $barriers = combine(
  $barrierType,
  $barriersList,
  (barrierType, barriersList) => barriersList[barrierType]
);

$canMoveDiagonal.on(changeDirection, (state) => !state);

graphDomain.onCreateStore((store) => store.reset(resetStore));

export const removedBarrier = guard({
  source: sample({
    source: $barriersList,
    clock: removeBarrierItem,
    fn: (state, { type, index }) => {
      const findedBarrier = state[type].find(
        (item) => item.getIndex() === index
      );

      if (findedBarrier) {
        return {
          type,
          index,
          findedBarrier,
        };
      }
    },
  }),
  filter: Boolean,
});

removedBarrier.watch(({ findedBarrier }) => findedBarrier.remove());

$barriersList
  .on(setBarrier, (state, { type, index }) => {
    const barrier = new Barier(index);

    const isFindIndex = state[type].find((item) => item.getIndex() === index);

    return {
      ...state,
      [type]: isFindIndex ? state[type] : [...state[type], barrier],
    };
  })
  .on(removedBarrier, (state, { type, index }) => {
    return {
      ...state,
      [type]: state[type].filter((item) => item.index !== index),
    };
  });

$startEndPosition
  .on(triggerStartPosition, (state, index) => [index, state[1]])
  .on(triggerEndPosition, (state, index) => [state[0], index]);

export const $graph = combine({
  barrier: $barriers,
  barrierType: $barrierType,
  barriersList: $barriersList,
  startEndPosition: $startEndPosition,
  canMoveDiagonal: $canMoveDiagonal,
}).map((state) => {
  const [start, end] = state.startEndPosition;

  const graph = graphControll.createGraph(state.canMoveDiagonal);

  if (state.barrierType === ceilType.BARIER) {
    setBarrierToGraph(graph, state.barrier);
  }

  if (state.barrierType === ceilType.WATER) {
    setWaterToGraph(graph, state.barrier);
  }

  setStartPositionToGraph(graph, start);
  setEndPositionToGraph(graph, end);

  return { ...state, graph: graph.graph };
});
