import PriorityQueue from "fastpriorityqueue";
import { GraphType, Graph } from "graph";
import { canVisitedVertex, restorePath, getVertexWeight } from "./utils";
import { AlgoritmController } from "./controller";

export function dijkstra(
  startIndex: number,
  endIndex: number,
  graph: GraphType,
  graphControll: Graph
) {
  let prevIndex = null;
  let isWork = true;

  const aInfo = new AlgoritmController(startIndex, endIndex);

  const priorityQueue = new PriorityQueue<[number, number]>(
    (a, b) => a[1] < b[1]
  );

  const visited = new Map([[startIndex, 0]]); // помещать сюда вершину из очереди

  const path: { [key: string]: number } = {};

  priorityQueue.add([startIndex, 0]);

  while (isWork && !priorityQueue.isEmpty()) {
    const [currentIndex] = priorityQueue.poll() || [];

    if (currentIndex === undefined || currentIndex === endIndex) {
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

    // Получить текущую вершину из очереди и получить ее соседей

    // пройтипо всем соседям текущей вершины, вычислить вес, указать предка
    for (let i = 0; i < currentVertex.siblings.length; i++) {
      // сосед, находящийся в обработке у текущей вершины
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

        // вычислить вес соседа, сравнив с прошлым весом, если веса прошлого нет, значит он бесконечность

        // Положить ребро в просмотренные, с выполненными вычислениями
        if (weightIsLower) {
          priorityQueue.add([sibling.vertex, nextWeight]);

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
