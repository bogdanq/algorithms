import { getPositionByIndex, drawSquare } from "../config";

export function checkGameStatus(target, ...status) {
  return status.some((item) => target === item);
}

export function renderVisitedVertex(barrier, context, color) {
  for (let i = 0; i < barrier.length; i++) {
    const [x, y] = getPositionByIndex(barrier[i]);
    drawSquare({
      position: [x, y],
      context,
      color,
    });
  }
}
