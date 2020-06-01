import { canVisitedVertex, restorePath } from "./utils";
import { AlgoritmController } from "./controller";

export function depthFirstSearch(startIndex, endIndex, graph, graphControll) {
  const aInfo = new AlgoritmController(startIndex, endIndex);

  let isWork = true;
  const stack = [startIndex];
  const visited = [];
  const parent = {};
  let prevIndex = null;

  while (isWork && stack.length > 0) {
    const currentIndex = stack.shift();

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
        stack.unshift(next.vertex);
        visited.push(next.vertex);

        parent[next.vertex] = currentIndex;
        aInfo.increment();
      }

      if (next.vertex === endIndex) {
        isWork = false;
        break;
      }
    }
    prevIndex = currentIndex;
  }

  const result = aInfo.getAlgotitmResult();
  const path = restorePath(endIndex, startIndex, parent);

  return {
    path,
    ...result,
  };
}
