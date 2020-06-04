import { GraphType, Graph } from "graph";
import { canVisitedVertex, restorePath } from "./utils";
import { AlgoritmController } from "./controller";

export function depthFirstSearch(
  startIndex: number,
  endIndex: number,
  graph: GraphType,
  graphControll: Graph
) {
  let prevIndex = null;
  let isWork = true;

  const aInfo = new AlgoritmController(startIndex, endIndex);

  const stack = [startIndex];
  const visited = [startIndex];
  const path: { [key: string]: number } = {};

  while (isWork && stack.length > 0) {
    const currentIndex = stack.shift();

    if (!currentIndex) {
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

    for (let i = 0; i < graph[currentIndex].siblings.length; i++) {
      const sibling = graph[currentIndex].siblings[i];

      if (!sibling) {
        isWork = false;
        break;
      }

      const vertex = graphControll.getVertexByIndex(sibling.vertex);

      if (
        vertex &&
        !visited.includes(sibling.vertex) &&
        canVisitedVertex(vertex)
      ) {
        stack.unshift(sibling.vertex);
        visited.push(sibling.vertex);
        path[sibling.vertex] = currentIndex;

        aInfo.increment();
      }

      if (sibling.vertex === endIndex) {
        isWork = false;
        break;
      }
    }

    prevIndex = currentIndex;
  }

  const result = aInfo.getAlgotitmResult();
  const restoredPath = restorePath(endIndex, startIndex, path);

  return {
    ...result,
    path: restoredPath,
  };
}
