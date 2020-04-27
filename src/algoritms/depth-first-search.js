import { graphControll } from "../graph";
import { createLogger } from "../index";
import { canVisitedVertex, restorePath, removeDoubleVertex } from "./utils";

export function depthFirstSearch(startIndex, endIndex, graph) {
  const logger = createLogger();
  const removeVertex = removeDoubleVertex();
  let count = 0;

  let isWork = true;
  const stack = [startIndex];
  const visited = new Map([[startIndex, true]]);
  const parent = {};

  while (isWork && stack.length > 0) {
    logger.setVertex(removeVertex(stack));

    const currentIndex = stack.shift();

    for (let i = 0; i < graph[currentIndex].siblings.length; i++) {
      const next = graph[currentIndex].siblings[i];
      const vertex = graphControll.getVertexByIndex(next);

      if (!visited.has(next) && canVisitedVertex(vertex)) {
        stack.unshift(next);
        visited.set(next, true);

        parent[next] = currentIndex;
        count++;
      }

      if (next === endIndex) {
        isWork = false;
        break;
      }
    }
  }

  logger.setDrowAnimated(count);

  return restorePath(endIndex, startIndex, parent);
}
