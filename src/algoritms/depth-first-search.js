import { restorePath } from "./bred-first-search";
import { graphControll } from "../graph";
import {
  setVertices,
  endProcess,
  incrementStep,
  canVisitedVertex,
} from "../index";

export function depthFirstSearch(startIndex, endIndex, graph) {
  let isWork = true;
  const stack = [startIndex];
  const visited = new Map([[startIndex, true]]);
  const parent = {};

  while (isWork && stack.length > 0) {
    incrementStep();
    setVertices(stack.map((item) => item));

    const currentIndex = stack.shift();

    for (let i = 0; i < graph[currentIndex].siblings.length; i++) {
      const next = graph[currentIndex].siblings[i];
      const vertex = graphControll.getVertexByIndex(next);

      if (!visited.has(next) && canVisitedVertex(vertex)) {
        stack.unshift(next);
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
