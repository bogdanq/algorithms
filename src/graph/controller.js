import { ceilType, pageWidth, getLocalSize, pageHeight } from "../config";

class Graph {
  constructor({ w, h }) {
    this.graph = {};
    this.cellCount = w * h;
    this.lastIndex = null;
  }

  createGraph(canMoveDiagonal) {
    this.clear();
    for (let index = 0; index < this.cellCount; index++) {
      this.graph[index] = {
        type: ceilType.EMPTY,
        siblings: this.getSiblings(index, canMoveDiagonal)
          .map((item) =>
            typeof item !== "undefined" ? { vertex: item } : undefined
          )
          .filter(Boolean),
      };
    }

    return this;
  }

  getVertexByIndex(index) {
    return this.graph[index];
  }

  updateGraph({ index, type, weight }) {
    if (this.graph[index]) {
      this.graph[index] = { ...this.graph[index], type };

      if (type === ceilType.BARIER) {
        this.graph[index] = {
          ...this.graph[index],
          type,
          siblings: [],
        };
      }

      if (type === ceilType.WATER) {
        this.graph[index] = {
          ...this.graph[index],
          type,
          weight,
        };
      }
    }
  }

  getSiblings(index, canMoveDiagonal) {
    const left = this.getLeftSibling(index);
    const top = this.getTopSibling(index);
    const right = this.getRightSibling(index);
    const down = this.getDownSibling(index);

    if (canMoveDiagonal) {
      const topLeft = this.getTopLeftDiagonal(top, left);
      const topRight = this.getTopRightDiagonal(top, right);
      const botRight = this.getBotRightDiagonal(down, right);
      const botLeft = this.getBotLeftDiagonal(down, left);

      return [topLeft, top, topRight, right, botRight, down, botLeft, left];
    }

    return [top, left, down, right];
  }

  getTopLeftDiagonal(top, left) {
    if (top >= 0 && left >= 0) {
      return top - 1;
    }
  }

  getTopRightDiagonal(top, right) {
    if (top >= 0 && right >= 0) {
      return top + 1;
    }
  }

  getBotLeftDiagonal(bot, left) {
    if (bot >= 0 && left >= 0) {
      return bot - 1;
    }
  }

  getBotRightDiagonal(bot, right) {
    if (bot >= 0 && right) {
      return bot + 1;
    }
  }

  getBottomDiagonal(down) {
    const left = down - 1;
    const right = down + 1;

    return [left, right];
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
    return this.graph;
  }

  clear() {
    this.graph = {};
    return this;
  }
}

export const graphControll = new Graph(getLocalSize(pageWidth, pageHeight));
