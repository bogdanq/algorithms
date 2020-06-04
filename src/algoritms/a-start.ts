import PriorityQueue from "fastpriorityqueue";
import { GraphType, Graph } from "graph";
import { getPositionByIndex } from "../config";
import { AlgoritmController } from "./controller";
import { canVisitedVertex, restorePath, getVertexWeight } from "./utils";

function heuristic([x, y]: number[], [x1, y1]: number[]) {
  return Math.abs(x - x1) + Math.abs(y - y1);
}

export function aStar(
  startIndex: number,
  endIndex: number,
  graph: GraphType,
  graphControll: Graph
) {
  let prevIndex = null;
  let isWork = true;

  const positionByEndIndex = getPositionByIndex(endIndex);

  const aInfo = new AlgoritmController(startIndex, endIndex);

  const priorityQueue = new PriorityQueue<[number, number]>(
    (a, b) => a[1] < b[1]
  );

  const visited = new Map([[startIndex, 0]]);

  const path: { [key: string]: number } = {};

  priorityQueue.add([startIndex, 0]);

  while (isWork && !priorityQueue.isEmpty()) {
    const [currentIndex] = priorityQueue.poll() || [];

    if (!currentIndex || currentIndex === endIndex) {
      isWork = false;
      break;
    }

    const currentVertex = graph[currentIndex];

    aInfo.addVertex(
      {
        vertex: currentIndex,
        siblings: graph[currentIndex].siblings,
      },
      prevIndex
    );

    for (let i = 0; i < currentVertex.siblings.length; i++) {
      const sibling = currentVertex.siblings[i];

      if (!sibling) {
        isWork = false;
        break;
      }

      const vertex = graphControll.getVertexByIndex(sibling.vertex);

      if (vertex && canVisitedVertex(vertex)) {
        const nextWeight =
          (visited.get(currentIndex) || currentIndex) + getVertexWeight(vertex);

        const weightIsLower =
          typeof visited.get(sibling.vertex) === "undefined" ||
          nextWeight < (visited.get(sibling.vertex) || Infinity);

        if (weightIsLower && !visited.has(sibling.vertex)) {
          priorityQueue.add([
            sibling.vertex,
            nextWeight +
              heuristic(positionByEndIndex, getPositionByIndex(sibling.vertex)),
          ]);

          path[sibling.vertex] = currentIndex;
          visited.set(sibling.vertex, nextWeight);

          aInfo.increment();

          // if (endIndex === sibling.vertex) {
          //   isWork = false;
          //   break;
          // }
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
