export class AlgoritmController {
  constructor(startIndex, endIndex) {
    this.count = 0;
    this.processing = [];
    this.visited = [];
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  increment() {
    this.count++;
  }

  addVertex(processing, visited) {
    this.processing.push(processing);
    this.visited.push(visited);
  }

  getAlgotitmResult() {
    return this;
  }
}
