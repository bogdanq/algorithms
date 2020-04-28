import { createLogger } from "../index";
import { graphControll } from "../graph";
import { canVisitedVertex, restorePath, removeDoubleVertex } from "./utils";

export function breadthFirstSearch(startIndex, endIndex, graph) {
  // console.log(graph);
  const logger = createLogger();
  const removeVertexQ = removeDoubleVertex();
  const removeVertexV = removeDoubleVertex();
  let count = 0;

  let isWork = true;
  const queue = [startIndex];
  const visited = [startIndex];
  const parent = {};

  while (isWork && queue.length > 0) {
    const currentIndex = queue.shift();

    logger.setVertex({
      data: removeVertexV(visited),
      name: "visited",
    });

    for (let i = 0; i < graph[currentIndex].siblings.length; i++) {
      const next = graph[currentIndex].siblings[i];
      const vertex = graphControll.getVertexByIndex(next);

      if (!visited.includes(next) && canVisitedVertex(vertex)) {
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

    logger.setVertex({
      data: removeVertexQ(queue),
      name: "queue",
    });
  }

  logger.setDrowAnimated(count);

  return restorePath(endIndex, startIndex, parent);
}
