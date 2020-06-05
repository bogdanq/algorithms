import { addProcessedVertex, addVisitedVertex } from "../algoritms";
import { renderPath } from "../render/render-path";
import { getPositionByIndex, drawSquare } from "../config";
import { ProcessedVertex } from "../algoritms";
import { setGameStatus, GameStatus, Path } from "./model";

class AnimatedVisitedVertex {
  public context: null | number;

  constructor() {
    this.context = null;
  }

  setVertex(
    { animationCount, state }: { animationCount: number; state: Path | null },
    context: any
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

  animatedVertexWithArray(barriers: number[], context: any, color = "#000") {
    for (let i = 0; i < barriers.length; i++) {
      const [x, y] = getPositionByIndex(barriers[i]);

      drawSquare({
        position: [x, y],
        context,
        color,
      });
    }
  }

  animatedVertex(barrier: number, context: any, color = "#000") {
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
    if (!processedVertex.vertex) {
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
    this.animatedVertexWithArray(visitedVertex, this.context, "#00bcd4");
  }
}

export const animatedVisitedVertex = new AnimatedVisitedVertex();
