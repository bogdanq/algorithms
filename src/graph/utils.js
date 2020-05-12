import { ceilType, getLocalSize, getIndexByPosition } from "../config";
import {
  removeBarrierItem,
  setBarrier,
  triggerEndPosition,
  triggerStartPosition,
} from "./model";

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

export function setBarrierToState(event, state) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);

  const {
    graph: {
      startEndPosition: [startIndex, endIndex],
    },
    barrierType,
  } = state;

  if (index !== startIndex && index !== endIndex) {
    setBarrier({ index, barrierType });
  }
}

export function removeBarrierFromState(event) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);

  removeBarrierItem(index);
}

export function setStartToStore(index, { graph }) {
  const findIndex = graph.barrier.find((barrier) => barrier.index === index);
  const [, endIndex] = graph.startEndPosition;

  if (!findIndex && index !== endIndex) {
    triggerStartPosition(index);
  }
}

export function setEndToStore(index, { graph }) {
  const findIndex = graph.barrier.find((barrier) => barrier.index === index);
  const [startIndex] = graph.startEndPosition;

  if (!findIndex && index !== startIndex) {
    triggerEndPosition(index);
  }
}
