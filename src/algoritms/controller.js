export class AlgoritmController {
  constructor(startIndex, endIndex) {
    this.count = 0;
    this.processing = [];
    this.visited = [];
    this.startIndex = startIndex;
  }

  increment() {
    this.count++;
  }

  addToProcessing(processing) {
    this.processing.push([...processing]);
  }

  addToVisited(visited) {
    this.visited.push([...visited.filter((item) => item !== this.startIndex)]);
  }

  getAlgotitmResult() {
    return this;
  }
}
