import { graphControll } from "../graph";
import { createLogger } from "../index";
import { canVisitedVertex, restorePath } from "./utils";

export function depthFirstSearch(startIndex, endIndex, graph) {
  const logger = createLogger();
  let isWork = true;
  const stack = [startIndex];
  const visited = new Map([[startIndex, true]]);
  const parent = {};

  while (isWork && stack.length > 0) {
    logger.setVertex(stack.map((item) => item));

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

  logger.setDrowAnimated();

  return restorePath(endIndex, startIndex, parent);
}
