import { createLogger } from "../index";
import { graphControll } from "../graph";
import { canVisitedVertex, restorePath, removeDoubleVertex } from "./utils";

export function breadthFirstSearch(startIndex, endIndex, graph) {
  const logger = createLogger();
  const removeVertex = removeDoubleVertex();

  let isWork = true;
  const queue = [startIndex];
  const visited = new Map([[startIndex, true]]);
  const parent = {};

  while (isWork && queue.length > 0) {
    logger.setVertex(removeVertex(queue));

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

  logger.setDrowAnimated();

  return restorePath(endIndex, startIndex, parent);
}
