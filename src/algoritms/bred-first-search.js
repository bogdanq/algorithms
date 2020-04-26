import {
  setVertices,
  endProcess,
  incrementStep,
  canVisitedVertex,
} from "../index";
import { graphControll } from "../graph";
import { ceilType } from "../config";

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

export function breadthFirstSearch(startIndex, endIndex, graph) {
  let isWork = true;
  const queue = [startIndex];
  const visited = new Map([[startIndex, true]]);
  const parent = {};

  while (isWork && queue.length > 0) {
    incrementStep();
    setVertices(queue.map((item) => item));

    const currentIndex = queue.shift();

    for (let i = 0; i < graph[currentIndex].siblings.length; i++) {
      const next = graph[currentIndex].siblings[i];
      const vertex = graphControll.getVertexByIndex(next);

      if (!visited.has(next) && canVisitedVertex(vertex)) {
        queue.push(next);
        visited.set(next, true);

        parent[next] = currentIndex;
      }

      if (next === endIndex) {
        isWork = false;
        break;
      }
    }
  }

  endProcess();

  return restorePath(endIndex, startIndex, parent);
}
