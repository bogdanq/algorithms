import { restorePath } from "./bred-first-search";

export function depthFirstSearch(startIndex, endIndex, graph) {
  let isWork = true;
  const stack = [startIndex];
  const visited = new Map([[startIndex, true]]);
  const parent = {};

  while (isWork && stack.length > 0) {
    const currentIndex = stack.shift();

    for (let i = 0; i < graph[currentIndex].siblings.length; i++) {
      const next = graph[currentIndex].siblings[i];

      if (!visited.has(next)) {
        stack.unshift(next);
        visited.set(next, true);

        parent[next] = currentIndex;
      }

      if (next === endIndex) {
        isWork = false;
        break;
      }
    }
  }

  return restorePath(endIndex, startIndex, parent);
}
