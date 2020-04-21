import {
  createEvent,
  createStore,
  combine,
  restore,
  sample,
  merge,
  forward,
} from "effector";
import { startPosition, endPosition, ceilType } from "./config";
import { graphControll } from "./graph";

export const setBarrier = createEvent();
export const setGraph = createEvent();
export const removeBarrierItem = createEvent();
export const start = createEvent();
export const triggerStartPosition = createEvent();
export const triggerEndPosition = createEvent();

export const $startEndPosition = createStore([startPosition, endPosition]);
export const $barrier = createStore([0, 1]);
export const $graph = restore(setGraph, {});

$barrier
  .on(setBarrier, (state, index) => {
    const isFindIndex = state.includes(index);
    return isFindIndex ? state : [...state, index];
  })
  .on(removeBarrierItem, (state, index) =>
    state.filter((item) => item !== index)
  )
  .watch(start);

$startEndPosition
  .on(triggerStartPosition, (state, index) => [index, state[1]])
  .on(triggerEndPosition, (state, index) => [state[0], index])
  .watch(start);

export const $state = combine({
  barrier: $barrier,
  startEndPosition: $startEndPosition,
  graph: $graph,
});

$state.watch((state) => graphControll.updateGraph(state));
