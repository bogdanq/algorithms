export class AlgoritmController {
  public count: number;
  public processing: Array<{
    vertex: number;
    siblings: Array<number>;
  }>;
  public visited: Array<number | null>;
  public startIndex: number;
  public endIndex: number;

  constructor(startIndex: number, endIndex: number) {
    this.count = 0;
    this.processing = [];
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
    }: {
      vertex: number;
      siblings: Array<{
        vertex: number;
      }>;
    },
    visited: number | null
  ) {
    const updateProcessing = {
      vertex,
      siblings: siblings.map((item) => item.vertex),
    };

    this.processing.push(updateProcessing);
    this.visited.push(visited);
  }

  getAlgotitmResult() {
    return this;
  }
}
