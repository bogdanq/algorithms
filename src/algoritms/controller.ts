export class AlgoritmController {
  public count: number;
  public processing: Array<{ vertex: number; siblings: number[] }>;
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
      vertex: number;
      siblings: Array<{ vertex: number }>;
      processing?: Array<{ vertex: number }>;
    },
    visited: number | null
  ) {
    const updateProcessing = {
      vertex,
      siblings: ((processing && Object.values(processing)) || siblings).map(
        (item) => item.vertex
      ),
    };

    this.processing.push(updateProcessing);
    this.visited.push(visited);
  }

  getAlgotitmResult() {
    return this;
  }
}
