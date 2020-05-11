import PriorityQueue from "fastpriorityqueue";
import { graphControll } from "../graph";
import { canVisitedVertex, restorePath, getVertexWeight } from "./utils";
import { AlgoritmController } from "./controller";

export function dijkstra(startIndex, endIndex, graph) {
  const aInfo = new AlgoritmController(startIndex, endIndex);
  let prevIndex = null;
  const priorityQueue = new PriorityQueue((a, b) => a[1] < b[1]);
  const visited = new Map([[startIndex, 0]]); // помещать сюда вершину из очереди
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

    // Получить текущую вершину из очереди и получить ее соседей

    // пройтипо всем соседям текущей вершины, вычислить вес, указать предка
    for (let i = 0; i < currentVertex.siblings.length; i++) {
      // сосед, находящийся в обработке у текущей вершины
      const sibling = currentVertex.siblings[i];
      const vertex = graphControll.getVertexByIndex(sibling.vertex);

      if (vertex && canVisitedVertex(vertex)) {
        const nextWeight = visited.get(currentIndex) + getVertexWeight(vertex);

        const weightIsLower =
          visited.get(sibling.vertex) === undefined ||
          nextWeight < visited.get(sibling.vertex);

        // вычислить вес соседа, сравнив с прошлым весом, если веса прошлого нет, значит он бесконечность

        // Положить ребро в просмотренные, с выполненными вычислениями
        if (weightIsLower) {
          priorityQueue.add([sibling.vertex, nextWeight]);
          path[sibling.vertex] = currentIndex;
          visited.set(sibling.vertex, nextWeight);
          aInfo.increment();
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
