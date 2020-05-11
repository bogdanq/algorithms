import { triggerStartPosition, triggerEndPosition } from "../graph";
import { colorSchema, getPositionByIndex, drawSquare } from "../config";

export function drowStartEndPOsitions(startEndPosition, context) {
  for (let i = 0; i < startEndPosition.length; i++) {
    const index = getPositionByIndex(startEndPosition[i]);

    drawSquare({
      position: index,
      context,
      color: colorSchema.startEndColor[i],
    });
  }
}

export function renderStart(index, { graph }) {
  const findIndex = graph.barrier.find((barrier) => barrier.index === index);
  const [, endIndex] = graph.startEndPosition;

  if (!findIndex && index !== endIndex) {
    triggerStartPosition(index);
  }
}

export function renderEnd(index, { graph }) {
  const findIndex = graph.barrier.find((barrier) => barrier.index === index);
  const [startIndex] = graph.startEndPosition;

  if (!findIndex && index !== startIndex) {
    triggerEndPosition(index);
  }
}
