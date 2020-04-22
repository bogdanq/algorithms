import { createEvent, createStore, combine } from "effector";
import { startPosition, endPosition, ceilType } from "./config";
import { graphControll } from "./graph";

export const setBarrier = createEvent();
export const setGraph = createEvent();
export const removeBarrierItem = createEvent();
export const start = createEvent();
export const triggerStartPosition = createEvent();
export const triggerEndPosition = createEvent();

export const $startEndPosition = createStore([startPosition, endPosition]);
export const $barrier = createStore([]);

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
  graphControll.clear();
  const [start, end] = state.startEndPosition;

  const graph = graphControll.createGraph();

  setBarrierToGraph(graph, state.barrier);
  setStartPositionToGraph(graph, start);
  setEndPositionToGraph(graph, end);

  return { ...state, graph: graph.graph };
});

$graph.watch(start);
