import { getPositionByIndex, drawSquare } from "../config";

export function checkGameStatus(target, status) {
  return status.some((item) => target === item);
}

export function renderVisitedVertex(barrier, context, color) {
  if (barrier) {
    const [x, y] = getPositionByIndex(barrier);
    drawSquare({
      position: [x, y],
      context,
      color,
    });
  }
}

export function renderVisitedVertexByArr(barrier, context, color = "#000") {
  for (let i = 0; i < barrier.length; i++) {
    const [x, y] = getPositionByIndex(barrier[i]);
    drawSquare({
      position: [x, y],
      context,
      color,
    });
  }
}
