export class AlgoritmController {
  constructor(startIndex, endIndex) {
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

  addVertex({ vertex, siblings, processing }, visited) {
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
