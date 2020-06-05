import { BarrierType, getLocalSize, getIndexByPosition } from "../config";
import {
  removeBarrierItem,
  setBarrier,
  triggerEndPosition,
  triggerStartPosition,
  CombidenGraphType,
} from "./model";
import { Graph } from "./controller";
import { BarrierItem } from "./barrier";

export function setBarrierToGraph(graph: Graph, barriers: Array<BarrierItem>) {
  barriers.forEach((barrier) => {
    if (barrier.barrierType === BarrierType.BARIER) {
      graph.updateGraph({
        index: barrier.getIndex(),
        type: barrier.barrierType,
        siblings: [],
      });
    }

    if (barrier.barrierType === BarrierType.WATER) {
      graph.updateGraph({
        index: barrier.getIndex(),
        type: barrier.barrierType,
        weight: 10,
      });
    }

    if (barrier.barrierType === BarrierType.SAND) {
      graph.updateGraph({
        index: barrier.getIndex(),
        type: barrier.barrierType,
        weight: 3,
      });
    }
  });
}

export function setStartPositionToGraph(graph: Graph, startIndex: number) {
  graph.updateGraph({ index: startIndex, type: BarrierType.START_POSITION });
}

export function setEndPositionToGraph(graph: Graph, endIndex: number) {
  graph.updateGraph({ index: endIndex, type: BarrierType.END_POSITION });
}

export function setBarrierToState(
  event: MouseEvent,
  state: { graph: CombidenGraphType }
) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);

  const {
    graph: {
      startEndPosition: [startIndex, endIndex],
      barrierType,
    },
  } = state;

  if (index !== startIndex && index !== endIndex) {
    setBarrier({ index, barrierType });
  }
}

export function removeBarrierFromState(event: MouseEvent) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);

  removeBarrierItem(index);
}

export function setStartToStore(
  index: number,
  { graph }: { graph: CombidenGraphType }
) {
  const findIndex = graph.barrier.find((barrier) => barrier.index === index);
  const [, endIndex] = graph.startEndPosition;

  if (!findIndex && index !== endIndex) {
    triggerStartPosition(index);
  }
}

export function setEndToStore(
  index: number,
  { graph }: { graph: CombidenGraphType }
) {
  const findIndex = graph.barrier.find((barrier) => barrier.index === index);
  const [startIndex] = graph.startEndPosition;

  if (!findIndex && index !== startIndex) {
    triggerEndPosition(index);
  }
}
