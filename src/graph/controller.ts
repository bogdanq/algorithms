import { BarrierType, pageWidth, getLocalSize, pageHeight } from "../config";

export type GraphType = {
  [key: string]: {
    type: BarrierType;
    siblings: ({ vertex: number } | undefined)[];
    weight?: number;
  };
};

export class Graph {
  public graph: GraphType;
  private cellCount: number;

  constructor({ w, h }: { w: number; h: number }) {
    this.graph = {};
    this.cellCount = w * h;
  }

  createGraph(canMoveDiagonal: boolean) {
    this.clear();

    for (let index = 0; index < this.cellCount; index++) {
      this.graph[index] = {
        type: BarrierType.EMPTY,
        siblings: this.getSiblings(index, canMoveDiagonal)
          .map((item) =>
            typeof item !== "undefined" ? { vertex: item } : undefined
          )
          .filter(Boolean),
      };
    }

    return this;
  }

  getVertexByIndex(index?: number) {
    if (index) {
      return this.graph[index];
    }

    return null;
  }

  updateGraph({
    index,
    ...newParams
  }: {
    index: number;
    type: BarrierType;
    weight?: number;
    siblings?: [];
  }) {
    if (this.graph[index]) {
      this.graph[index] = { ...this.graph[index], ...newParams };
    }
  }

  getSiblings(index: number, canMoveDiagonal: boolean) {
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

  getTopLeftDiagonal(top?: number, left?: number) {
    if (!top || !left) {
      return undefined;
    }

    if (top >= 0 && left >= 0) {
      return top - 1;
    }
  }

  getTopRightDiagonal(top?: number, right?: number) {
    if (!top || !right) {
      return undefined;
    }

    if (top >= 0 && right >= 0) {
      return top + 1;
    }
  }

  getBotLeftDiagonal(bot?: number, left?: number) {
    if (!bot || !left) {
      return undefined;
    }

    if (bot >= 0 && left >= 0) {
      return bot - 1;
    }
  }

  getBotRightDiagonal(bot?: number, right?: number) {
    if (!bot || !right) {
      return undefined;
    }

    if (bot >= 0 && right) {
      return bot + 1;
    }
  }

  getBottomDiagonal(down: number) {
    const left = down - 1;
    const right = down + 1;

    return [left, right];
  }

  getDownSibling(index: number) {
    const { w, h } = getLocalSize(pageWidth, pageHeight);

    const hasDownNeighbour = Math.floor(index / w) < h - 1;

    if (hasDownNeighbour) {
      return index + w;
    }
  }

  getTopSibling(index: number) {
    const { w } = getLocalSize(pageWidth, pageHeight);

    const hasTopNeighbour = Math.floor(index / w) > 0;

    if (hasTopNeighbour) {
      return index - w;
    }
  }

  getRightSibling(index: number) {
    const { w } = getLocalSize(pageWidth, pageHeight);

    const hasRightNeighbour = index % w < w - 1;

    if (hasRightNeighbour) {
      return index + 1;
    }
  }

  getLeftSibling(index: number) {
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
