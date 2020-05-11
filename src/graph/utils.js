import { ceilType } from "../config";

export function setBarrierToGraph(graph, barriers) {
  barriers.forEach((barrier) => {
    graph.updateGraph({ index: barrier.getIndex(), type: ceilType.BARIER });
  });
}

export function setStartPositionToGraph(graph, startIndex) {
  graph.updateGraph({ index: startIndex, type: ceilType.START_POSITION });
}

export function setEndPositionToGraph(graph, endIndex) {
  graph.updateGraph({ index: endIndex, type: ceilType.END_POSITION });
}

export function setWaterToGraph(graph, waterBarriers) {
  waterBarriers.forEach((barrier) => {
    graph.updateGraph({
      index: barrier.getIndex(),
      type: ceilType.WATER,
      weight: 5,
    });
  });
}
