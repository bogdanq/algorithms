export const code = `
/*
Что бы работала визуализация, функция должна следовать общему api

  type youAlgoritmFunction = (
    startIndex: number,
    endIndex: number,
    graph: { [key: string]: { type: BarrierType , siblings: Array<number> } },
    graphControll: Graph,
  ) => {
    path: Array<number>,
    ...getAlgotitmResult
  }

Метод нужен, что бы каждую итерацию алгоритма сохранять его данные

  type AlgoritmController = {
    increment: () => void;
    getAlgotitmResult: () => AlgoritmController;
    addVertex: (
      processing: Array<{vertex: number, siblings: number[]}>,
      visited: number
    ) => void;
    count: number;
    processing: Array<{vertex: number, siblings: number[]}>;
    visited: number | null[];
    startIndex: number;
    endIndex: number;
  }

  const algoritmController = new AlgoritmController(startIndex: number, endIndex: number)

  enum BarrierType {
    START_POSITION = "START_POSITION",
    END_POSITION = "END_POSITION",
    BARIER = "BARIER",
    EMPTY = "EMPTY",
    VISITED = "VISITED",
  };

Функция restorePath восстановить путь, по переданному обьекту.
Содержит путь от предыдущего к следующей вершине

  type RestorePath = (
    endIndex: number,
    startIndex: number,
    parent: { [key: string]: number }
  ) => Array<number>

CanVisitedVertex проверяет, можно ли прайти на указанную вершину

  type CanVisitedVertex = (
    vertex: { type: BarrierType , siblings: Array<number> }
  ) => boolean
*/

const { AlgoritmController, canVisitedVertex, restorePath } = utils

function customAlgoritm(
  startIndex,
  endIndex,
  graph,
  graphControll,
) {
  let prevIndex = null;
  let isWork = true;

  const aInfo = new AlgoritmController(startIndex, endIndex);

  const queue = [startIndex];
  const visited = [startIndex];
  const path = {};

  while (isWork && queue.length > 0) {
    const currentIndex = queue.shift();

    if (currentIndex === undefined) {
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
        queue.push(sibling.vertex);
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
`;
