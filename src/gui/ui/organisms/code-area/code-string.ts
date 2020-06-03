export const codeString = `
// что бы работала визуализация, функция должна следовать общему api
  type youAlgoritmFunction = (
    startIndex: number, 
    endIndex: number, 
    graph: Graph
  ) => { 
    path: Array<number>, 
    AlgoritmController 
  }

// метод нужен, что бы каждую итерацию алгоритма сохранять его данные

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


  /*
    GraphControll - создает граф, может вернуть вершину по индексу
  */

  enum CeilType {
    START_POSITION = "START_POSITION",
    END_POSITION = "END_POSITION",
    BARIER = "BARIER",
    EMPTY = "EMPTY",
    VISITED = "VISITED",
  };
  
  type Graph = { [key: string]: { type: CeilType , siblings: Array<number> } }

  type GraphControll = {
    getVertexByIndex: (index: number) => Graph
  }

  /* 
    функция restorePath восстановить путь, по переданному обьекту. 
    Содержит путь от предыдущего к следующей вершине
  */

  type RestorePath = (
    endIndex: number, 
    startIndex: number, 
    parent: { [key: string]: number }
  ) => Array<number>

  // сanVisitedVertex проверяет, можно ли прайти на указанную вершину
    type CanVisitedVertex = (
      vertex: { type: CeilType , siblings: Array<number> }
    ) => boolean
`;
