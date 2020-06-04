import { addProcessedVertex, addVisitedVertex } from "../algoritms";
import { setGameStatus, GameStatus } from "./model";
import { renderPath } from "../render/render-path";
import { getPositionByIndex, drawSquare } from "../config";

class AnimatedVisitedVertex {
  public context: null | number;

  constructor() {
    this.context = null;
  }

  setVertex(
    { animationCount, state }: { animationCount: number; state: any },
    context: any
  ) {
    if (!this.context) {
      this.context = context;
    }

    const { processing = [] } = state;

    if (animationCount < processing.length) {
      addProcessedVertex(processing[animationCount]);

      if (processing[animationCount - 1]) {
        addVisitedVertex(processing[animationCount - 1].vertex);
      }
    } else {
      setGameStatus(GameStatus.END_GAME);

      renderPath({
        path: state.path,
        context,
      });
    }
  }

  animatedVertexWithArray(barriers, context, color = "#000") {
    for (let i = 0; i < barriers.length; i++) {
      const [x, y] = getPositionByIndex(barriers[i]);

      drawSquare({
        position: [x, y],
        context,
        color,
      });
    }
  }

  animatedVertex(barrier, context, color = "#000") {
    if (barrier) {
      const [x, y] = getPositionByIndex(barrier);

      drawSquare({
        position: [x, y],
        context,
        color,
      });
    }
  }

  drawVertexWithLoop(processedVertex) {
    this.animatedVertexWithArray(
      processedVertex.siblings,
      this.context,
      "#d2ef99"
    );
    this.animatedVertex(processedVertex.vertex, this.context, "#f3fc23");
  }

  drawVisitedVertexWithLoop(visitedVertex) {
    this.animatedVertexWithArray(visitedVertex, this.context, "#00bcd4");
  }
}

export const animatedVisitedVertex = new AnimatedVisitedVertex();
