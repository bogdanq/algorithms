export class AlgoritmController {
  public count: number;
  public processing: Array<{
    vertex: number;
    siblings: (number | undefined)[];
  }>;
  public dejkstra: number[];
  public visited: (number | null)[];
  public startIndex: number;
  public endIndex: number;

  constructor(startIndex: number, endIndex: number) {
    this.count = 0;
    this.processing = [];
    this.dejkstra = [];
    this.visited = [];
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  increment() {
    this.count++;
  }

  addVertex(
    {
      vertex,
      siblings,
      processing,
    }: {
      vertex?: number;
      siblings: (
        | {
            vertex: number;
          }
        | undefined
      )[];
      processing?: Array<{ vertex: number }>;
    },
    visited: number | null
  ) {
    if (vertex) {
      const updateProcessing = {
        vertex,
        siblings: ((processing && Object.values(processing)) || siblings)
          .map((item) => item && item.vertex)
          .filter(Boolean),
      };

      this.processing.push(updateProcessing);
      this.visited.push(visited);
    }
  }

  getAlgotitmResult() {
    return this;
  }
}
