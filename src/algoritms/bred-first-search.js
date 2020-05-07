import { graphControll } from "../graph";
import { canVisitedVertex, restorePath } from "./utils";
import { AlgoritmController } from "./controller";

export function breadthFirstSearch(startIndex, endIndex, graph) {
  const aInfo = new AlgoritmController(startIndex, endIndex);
  let prevIndex = null;
  let isWork = true;
  const queue = [startIndex];
  const visited = [startIndex];
  const parent = {};

  while (isWork && queue.length > 0) {
    const currentIndex = queue.shift();

    aInfo.addVertex(
      {
        vertex: currentIndex,
        siblings: graph[currentIndex].siblings,
      },
      prevIndex
    );

    for (let i = 0; i < graph[currentIndex].siblings.length; i++) {
      const next = graph[currentIndex].siblings[i];

      const vertex = graphControll.getVertexByIndex(next.vertex);

      if (!visited.includes(next.vertex) && canVisitedVertex(vertex)) {
        queue.push(next.vertex);
        visited.push(next.vertex);

        parent[next.vertex] = currentIndex;
        aInfo.increment();
      }
      prevIndex = currentIndex;
      if (next.vertex === endIndex) {
        isWork = false;
        break;
      }
    }
  }

  const result = aInfo.getAlgotitmResult();
  const path = restorePath(endIndex, startIndex, parent);

  return {
    path,
    ...result,
  };
}
