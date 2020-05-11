import { ceilType } from "../config";

export const canVisitedVertex = (vertex) => {
  if (vertex.type !== ceilType.BARIER) {
    return true;
  }
  return false;
};

export function restorePath(endIndex, startIndex, historyPath) {
  const path = [endIndex];
  let lastStep = endIndex;

  while (lastStep && lastStep !== startIndex) {
    path.unshift(historyPath[lastStep]);
    lastStep = historyPath[lastStep];
  }

  return path;
}

export function removeDoubleVertex(target) {
  return target.reduce((acc, row) => {
    acc.push(row.filter((el) => !acc.some((accRow) => accRow.includes(el))));
    return acc;
  }, []);
}

export function getVertexWeight(vertex) {
  if (vertex.weight) {
    return vertex.weight;
  }

  return 1;
}
