import { setVertices, endProcess, incrementStep } from "../index";

export function restorePath(endIndex, startIndex, parent) {
  const path = [];
  let target = parent[endIndex];

  while (target && target !== startIndex) {
    path.unshift(target);
    target = parent[target];
  }

  if (path.length > 0) {
    path.push(endIndex);
  }

  path.unshift(startIndex); // показать первую вершину

  return path;
}

export function breadthFirstSearch(startIndex, endIndex, graph) {
  let isWork = true;
  const queue = [startIndex];
  const visited = new Map([[startIndex, true]]);
  const parent = {};
  const bariers = [];

  for (const key in graph) {
    if (graph[key].type === "BARIER") {
      bariers.push(parseInt(key));
    }
  }

  while (isWork && queue.length > 0) {
    incrementStep();
    setVertices(queue.map((item) => item));

    const currentIndex = queue.shift();

    for (let i = 0; i < graph[currentIndex].siblings.length; i++) {
      const next = graph[currentIndex].siblings[i];

      if (!visited.has(next) && !bariers.includes(next)) {
        queue.push(next);
        visited.set(next, true);

        parent[next] = currentIndex;
      }

      if (next === endIndex) {
        isWork = false;
        break;
      }
    }
  }

  endProcess();

  return restorePath(endIndex, startIndex, parent);
}
