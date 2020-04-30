import { ceilType } from "../config";

export const canVisitedVertex = (vertex) => {
  if (vertex.type !== ceilType.BARIER) {
    return true;
  }
  return false;
};

export function restorePath(endIndex, startIndex, parent) {
  const path = [];
  let target = parent[endIndex];

  while (target && target !== startIndex) {
    path.unshift(target);
    target = parent[target];
  }

  if (path.length > 0) {
    path.push(endIndex);
  }

  path.unshift(startIndex);

  return path;
}

export function removeDoubleVertex(target) {
  return target.reduce((acc, row) => {
    acc.push(row.filter((el) => !acc.some((accRow) => accRow.includes(el))));
    return acc;
  }, []);
}
