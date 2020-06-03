import PriorityQueue from "fastpriorityqueue";
import { canVisitedVertex, restorePath, getVertexWeight } from "./utils";
import { AlgoritmController } from "./controller";
import { getPositionByIndex } from "../config";

function heuristic([x, y], [x1, y1]) {
  return Math.abs(x - x1) + Math.abs(y - y1);
}

export function aStar(startIndex, endIndex, graph, graphControll) {
  const positionByEndIndex = getPositionByIndex(endIndex);

  const aInfo = new AlgoritmController(startIndex, endIndex);
  let prevIndex = null;
  const priorityQueue = new PriorityQueue((a, b) => a[1] < b[1]);
  const visited = new Map([[startIndex, 0]]);
  const path = {};
  let isWork = true;

  priorityQueue.add([startIndex, 0]);

  while (isWork && !priorityQueue.isEmpty()) {
    const [currentIndex] = priorityQueue.poll();
    const currentVertex = graph[currentIndex];

    if (currentIndex === endIndex) {
      isWork = false;
      break;
    }

    aInfo.addVertex(
      {
        vertex: currentIndex,
        siblings: graph[currentIndex].siblings,
      },
      prevIndex
    );

    for (let i = 0; i < currentVertex.siblings.length; i++) {
      const sibling = currentVertex.siblings[i];
      const vertex = graphControll.getVertexByIndex(sibling.vertex);

      if (vertex && canVisitedVertex(vertex)) {
        const nextWeight = visited.get(currentIndex) + getVertexWeight(vertex);

        const weightIsLower =
          typeof visited.get(sibling.vertex) === "undefined" ||
          nextWeight < visited.get(sibling.vertex);

        if (weightIsLower && !visited.has(sibling.vertex)) {
          priorityQueue.add([
            sibling.vertex,
            nextWeight +
              heuristic(positionByEndIndex, getPositionByIndex(sibling.vertex)),
          ]);
          path[sibling.vertex] = currentIndex;
          visited.set(sibling.vertex, nextWeight);
          aInfo.increment();

          if (endIndex === sibling.vertex) {
            isWork = false;
            break;
          }
        }
      }
    }

    prevIndex = currentIndex;
  }

  const restoredPath = restorePath(endIndex, startIndex, path);
  const result = aInfo.getAlgotitmResult();

  return {
    ...result,
    path: restoredPath,
  };
}
