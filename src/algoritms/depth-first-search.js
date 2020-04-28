import { graphControll } from "../graph";
import { createLogger } from "../index";
import { canVisitedVertex, restorePath, removeDoubleVertex } from "./utils";

export function depthFirstSearch(startIndex, endIndex, graph) {
  const logger = createLogger();
  const removeVertexQ = removeDoubleVertex();
  const removeVertexV = removeDoubleVertex();
  let count = 0;

  let isWork = true;
  const stack = [startIndex];
  const visited = [startIndex];
  const parent = {};

  while (isWork && stack.length > 0) {
    const currentIndex = stack.shift();

    for (let i = 0; i < graph[currentIndex].siblings.length; i++) {
      const next = graph[currentIndex].siblings[i];
      const vertex = graphControll.getVertexByIndex(next);

      if (!visited.includes(next) && canVisitedVertex(vertex)) {
        logger.setVertex({
          data: removeVertexV(visited),
          name: "visited",
        });

        stack.unshift(next);
        visited.push(next);

        logger.setVertex({
          data: removeVertexQ(stack),
          name: "queue",
        });

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
