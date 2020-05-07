import PriorityQueue from "fastpriorityqueue";
import { graphControll } from "../graph";
import { canVisitedVertex, restorePath } from "./utils";
import { AlgoritmController } from "./controller";

export function dijkstra(startIndex, endIndex, graph) {
  const visitedVertexWeight = {};
  const historyPath = {};
  const pq = new PriorityQueue();
  let isWork = false;

  visitedVertexWeight[startIndex] = 0;

  pq.add([startIndex, 0]);

  while (!isWork && !pq.isEmpty()) {
    const [currentNode] = pq.poll();

    for (let i = 0; i < graph[currentNode].siblings.length; i++) {
      const nextVertex = graph[currentNode].siblings[i];
      const vertex = graphControll.getVertexByIndex(nextVertex);
      const newxWeight = visitedVertexWeight[currentNode] + nextVertex.weight;
      const isSmallerVertex =
        newxWeight < (visitedVertexWeight[nextVertex.vertex] || Infinity);

      if (isSmallerVertex && canVisitedVertex(vertex)) {
        visitedVertexWeight[nextVertex.vertex] = newxWeight;
        historyPath[nextVertex.vertex] = currentNode;
        pq.add([nextVertex.vertex, newxWeight]);

        // if (nextVertex.verte === endIndex) {
        //   isWork = false;
        //   break;
        // }
      }
    }
  }
  console.log(restorePath(endIndex, startIndex, historyPath));

  return restorePath(endIndex, startIndex, historyPath);
}
