import { getLocalSize, getIndexByPosition } from "../config";
import { setBarrier, removeBarrierItem } from "../graph";

export function renderCeil(event, state) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);

  const { graph, barrierType } = state;

  const [startIndex, endIndex] = graph.startEndPosition;

  return {
    renderForMove: () => {
      if (index !== startIndex && index !== endIndex) {
        setBarrier({ index, type: barrierType });
      }
    },
    renderForClick: () => {
      if (index !== startIndex && index !== endIndex) {
        removeBarrierItem({ index, type: barrierType });
      }
    },
  };
}
