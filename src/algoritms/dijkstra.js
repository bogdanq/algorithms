import PriorityQueue from "fastpriorityqueue";
import { graphControll } from "../graph";
import { canVisitedVertex, restorePath } from "./utils";
import { AlgoritmController } from "./controller";
import _ from "lodash";

export function dijkstra(startIndex, endIndex, graph) {
  const aInfo = new AlgoritmController(startIndex, endIndex);
  let prevIndex = null;
  const priorityQueue = new PriorityQueue((a, b) => a[1] < b[1]);
  const visited = { [startIndex]: true }; // помещать сюда вершину из очереди
  const processing = {}; // помещать сюда новые значения
  const path = {};
  let isWork = true;

  priorityQueue.add([startIndex, 0]);

  while (isWork && !priorityQueue.isEmpty()) {
    const [currentIndex] = priorityQueue.poll();

    aInfo.addVertex(
      {
        vertex: currentIndex,
        processing,
      },
      prevIndex
    );

    // Получить текущую вершину из очереди и получить ее соседей
    const currentVertex = graph[currentIndex];

    // пройтипо всем соседям текущей вершины, вычислить вес, указать предка
    for (let i = 0; i < currentVertex.siblings.length; i++) {
      // сосед, находящийся в обработке у текущей вершины
      const sibling = currentVertex.siblings[i];
      const vertex = graphControll.getVertexByIndex(sibling.vertex);

      // вычислить вес соседа, сравнив с прошлым весом, если веса прошлого нет, значит он бесконечность

      // Положить ребро в просмотренные, с выполненными вычислениями

      if (!visited[sibling.vertex] && canVisitedVertex(vertex)) {
        const weight =
          sibling.weight < (processing[sibling.vertex]?.weight || Infinity);

        path[sibling.vertex] = currentIndex;

        processing[sibling.vertex] = {
          weight: weight ? sibling.weight : processing[sibling.vertex].weight,
          parent: currentIndex,
          vertex: sibling.vertex,
        };

        aInfo.increment();
      }

      if (currentIndex === endIndex) {
        isWork = false;
        break;
      }
    }

    prevIndex = currentIndex;

    // необходимо найти наименьший вес из ребер в processing
    const minSibling = _.minBy(Object.values(processing), "weight");

    if (minSibling) {
      // path[minSibling.vertex] = processing[minSibling.vertex]?.parent;
      visited[minSibling.vertex] = true;
      priorityQueue.add([minSibling.vertex, minSibling.weight]);
      delete processing[minSibling.vertex];
    }
  }

  const restoredPath = restorePath(endIndex, startIndex, path);
  const result = aInfo.getAlgotitmResult();

  return {
    ...result,
    path: restoredPath,
  };
}
