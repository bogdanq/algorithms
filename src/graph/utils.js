import { ceilType } from "../config";

export function setBarrierToGraph(graph, barriers) {
  barriers.forEach((barrier) => {
    if (barrier.barrierType === ceilType.BARIER) {
      graph.updateGraph({
        index: barrier.getIndex(),
        type: barrier.barrierType,
        siblings: [],
      });
    }

    if (barrier.barrierType === ceilType.WATER) {
      graph.updateGraph({
        index: barrier.getIndex(),
        type: barrier.barrierType,
        weight: 10,
      });
    }

    if (barrier.barrierType === ceilType.SAND) {
      graph.updateGraph({
        index: barrier.getIndex(),
        type: barrier.barrierType,
        weight: 3,
      });
    }
  });
}

export function setStartPositionToGraph(graph, startIndex) {
  graph.updateGraph({ index: startIndex, type: ceilType.START_POSITION });
}

export function setEndPositionToGraph(graph, endIndex) {
  graph.updateGraph({ index: endIndex, type: ceilType.END_POSITION });
}
