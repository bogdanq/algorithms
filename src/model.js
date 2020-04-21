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

function setBarrierToGraph(graph, barriers) {
  barriers.forEach((barrierIndex) =>
    graph.updateGraph({ index: barrierIndex, type: ceilType.BARIER })
  );
}

function setStartPositionToGraph(graph, startIndex) {
  graph.updateGraph({ index: startIndex, type: ceilType.START_POSITION });
}

function setEndPositionToGraph(graph, endIndex) {
  graph.updateGraph({ index: endIndex, type: ceilType.END_POSITION });
}

export const $graph = combine({
  barrier: $barrier,
  startEndPosition: $startEndPosition,
}).map((state) => {
  const [start, end] = state.startEndPosition;
  graphControll.clear();

  const graph = graphControll.createGraph();

  setBarrierToGraph(graph, state.barrier);
  setStartPositionToGraph(graph, start);
  setEndPositionToGraph(graph, end);

  return { ...state, graph: graph.graph };
});

$graph.watch((state) => console.log("watch", state));
