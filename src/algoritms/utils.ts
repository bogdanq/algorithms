import { BarrierType } from "../config";
import { Vertex } from "graph";

export const canVisitedVertex = (vertex: { type: BarrierType }) => {
  if (vertex.type !== BarrierType.BARIER) {
    return true;
  }
  return false;
};

export function restorePath(
  endIndex: number,
  startIndex: number,
  historyPath: { [key: string]: number }
) {
  const path = [endIndex];
  let lastStep = endIndex;

  while (lastStep && lastStep !== startIndex) {
    path.unshift(historyPath[lastStep]);
    lastStep = historyPath[lastStep];
  }

  return path;
}

export function getVertexWeight(vertex: Vertex | null) {
  if (vertex.weight) {
    return vertex.weight;
  }

  return 1;
}
