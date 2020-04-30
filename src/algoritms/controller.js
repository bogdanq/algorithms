export class AlgoritmController {
  constructor() {
    this.count = 0;
    this.processing = [];
    this.visited = [];
  }

  increment() {
    this.count++;
  }

  addToProcessing(processing) {
    this.processing.push([...processing]);
  }

  addToVisited(visited) {
    this.visited.push([...visited]);
  }

  getAlgotitmResult() {
    return this;
  }
}
