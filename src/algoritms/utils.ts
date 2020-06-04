import { Vertex } from "graph";
import { BarrierType } from "../config";

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
  if (vertex && vertex.weight) {
    return vertex.weight;
  }

  return 1;
}
