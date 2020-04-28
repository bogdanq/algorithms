import { clearCanvas } from "../graph";
import { renderBarrier, renderPath } from "../canvas";
import { gameStatus, $path, setGameStatus, $gameState } from "./model";

export class GameLoop {
  constructor() {
    this.count = 1;
    this.animateId = null;
  }

  start(state, context) {
    const { traversedVertexes, vertexesCount } = state;
    const gameState = $gameState.getState();

    if (gameState === gameStatus.END_GAME) {
      return;
    }

    if (gameState === gameStatus.PAUSE) {
      cancelAnimationFrame(this.animateId);
      return;
    }

    // if (gameState === gameStatus.RESUME) {
    //   cancelAnimationFrame(this.animateId);
    //   return;
    // }

    if (this.count < traversedVertexes.visited.length) {
      if (this.count < traversedVertexes.queue.length) {
        renderBarrier(
          traversedVertexes.queue[this.count],
          context,
          "rgb(152, 251, 152)"
        );
      }

      renderBarrier(
        traversedVertexes.visited[this.count],
        context,
        "rgb(175, 238, 238)"
      );

      this.animateId = requestAnimationFrame(() =>
        this.start({ traversedVertexes, vertexesCount }, context)
      );

      clearCanvas.watch(() => cancelAnimationFrame(this.animateId));

      this.count++;
    } else {
      setGameStatus(gameStatus.END_GAME);
      this.clear();
      const path = $path.getState();
      renderPath({
        path,
        context,
      });
    }
  }

  clear() {
    cancelAnimationFrame(this.animateId);
    this.count = 1;
    this.animateId = null;
  }

  removeAnimation() {
    cancelAnimationFrame(this.animateId);
  }
}

export const gameLoop = new GameLoop();
