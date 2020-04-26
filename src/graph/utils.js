import { ceilType } from "../config";

export function setBarrierToGraph(graph, barriers) {
  barriers.forEach((barrierIndex) => {
    graph.updateGraph({ index: barrierIndex, type: ceilType.BARIER });
  });
}

export function setStartPositionToGraph(graph, startIndex) {
  graph.updateGraph({ index: startIndex, type: ceilType.START_POSITION });
}

export function setEndPositionToGraph(graph, endIndex) {
  graph.updateGraph({ index: endIndex, type: ceilType.END_POSITION });
}
