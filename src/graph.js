import { ceilType, pageWidth, getLocalSize, pageHeight } from "./config";
import { setGraph } from "./model";

class Graph {
  constructor({ w, h }) {
    this.graph = {};
    this.cellCount = w * h;
    this.lastIndex = null;
  }

  createGraph() {
    for (let index = 0; index < this.cellCount; index++) {
      this.graph[index] = {
        type: ceilType.EMPTY,
        siblings: [
          this.getLeftSibling(index),
          this.getTopSibling(index),
          this.getRightSibling(index),
          this.getDownSibling(index),
        ].filter((item) => typeof item !== "undefined"),
      };
    }
  }

  updateGraph({ startEndPosition: [start, end], barrier }) {
    this.graph[start].type = ceilType.START_POSITION;

    if (this.lastIndex) {
      if (this.graph[this.lastIndex].type === ceilType.START_POSITION) {
        // this.graph[this.lastIndex].type = ceilType.EMPTY;
      }
    }

    this.lastIndex = start;
  }

  getDownSibling(index) {
    const { w, h } = getLocalSize(pageWidth, pageHeight);

    const hasDownNeighbour = Math.floor(index / w) < h - 1;

    if (hasDownNeighbour) {
      return index + w;
    }
  }

  getTopSibling(index) {
    const { w } = getLocalSize(pageWidth, pageHeight);

    const hasTopNeighbour = Math.floor(index / w) > 0;

    if (hasTopNeighbour) {
      return index - w;
    }
  }

  getRightSibling(index) {
    const { w } = getLocalSize(pageWidth, pageHeight);

    const hasRightNeighbour = index % w < w - 1;

    if (hasRightNeighbour) {
      return index + 1;
    }
  }

  getLeftSibling(index) {
    const { w } = getLocalSize(pageWidth, pageHeight);

    const hasLeftNeighbour = index % w > 0;

    if (hasLeftNeighbour) {
      return index - 1;
    }
  }

  getGraph() {
    return Object.assign({}, this.graph);
  }
}

export const graphControll = new Graph(getLocalSize(pageWidth, pageHeight));

graphControll.createGraph();
