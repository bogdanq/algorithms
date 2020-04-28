import { createLogger } from "../index";
import { graphControll } from "../graph";
import { canVisitedVertex, restorePath, removeDoubleVertex } from "./utils";

export function breadthFirstSearch(startIndex, endIndex, graph) {
  const logger = createLogger();
  const removeVertexQ = removeDoubleVertex();
  const removeVertexV = removeDoubleVertex();
  let count = 0;

  let isWork = true;
  const queue = [startIndex];
  const visited = [startIndex];
  const parent = {};

  while (isWork && queue.length > 0) {
    logger.setVertex({
      data: removeVertexQ(queue),
      name: "queue",
    });

    const currentIndex = queue.shift();

    for (let i = 0; i < graph[currentIndex].siblings.length; i++) {
      const next = graph[currentIndex].siblings[i];
      const vertex = graphControll.getVertexByIndex(next);

      if (!visited.includes(next) && canVisitedVertex(vertex)) {
        logger.setVertex({
          data: removeVertexV(visited),
          name: "visited",
        });

        queue.push(next);
        visited.push(next);

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
