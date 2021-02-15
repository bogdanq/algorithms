import {
  addProcessedVertex,
  addVisitedVertex,
  ProcessedVertex,
} from "../algoritms";
import { renderPath } from "../render";
import { getPositionByIndex, drawSquare } from "../config";
import { setGameStatus, GameStatus, Path } from "./models";

class AnimatedVisitedVertex {
  public context: null | CanvasRenderingContext2D;

  constructor() {
    this.context = null;
  }

  setVertex(
    { animationCount, state }: { animationCount: number; state: Path | null },
    context: CanvasRenderingContext2D
  ) {
    if (!this.context) {
      this.context = context;
    }

    if (!state) {
      return;
    }

    const { processing = [] } = state;

    if (animationCount < processing.length) {
      const processed = processing[animationCount];
      const visited = processing[animationCount - 1];

      addProcessedVertex(processed);

      if (visited) {
        addVisitedVertex(visited.vertex);
      }
    } else {
      setGameStatus(GameStatus.END_GAME);

      renderPath({
        path: state.path,
        context,
      });
    }
  }

  animatedVertexWithArray(
    barriers: number[],
    context: CanvasRenderingContext2D,
    color = "#000"
  ) {
    for (let i = 0; i < barriers.length; i++) {
      const [x, y] = getPositionByIndex(barriers[i]);

      drawSquare({
        position: [x, y],
        context,
        color,
      });
    }
  }

  animatedVertex(
    barrier: number,
    context: CanvasRenderingContext2D,
    color = "#000"
  ) {
    if (barrier) {
      const [x, y] = getPositionByIndex(barrier);

      drawSquare({
        position: [x, y],
        context,
        color,
      });
    }
  }

  drawVertexWithLoop(processedVertex: ProcessedVertex) {
    if (!processedVertex.vertex || !this.context) {
      return;
    }

    this.animatedVertexWithArray(
      processedVertex.siblings,
      this.context,
      "#d2ef99"
    );

    this.animatedVertex(processedVertex.vertex, this.context, "#f3fc23");
  }

  drawVisitedVertexWithLoop(visitedVertex: number[]) {
    if (this.context) {
      this.animatedVertexWithArray(visitedVertex, this.context, "#00bcd4");
    }
  }
}

export const animatedVisitedVertex = new AnimatedVisitedVertex();
