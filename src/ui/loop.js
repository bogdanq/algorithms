import { clearCanvas } from "../graph";
import { renderBarrier, renderPath } from "../canvas";
import {
  gameStatus,
  $path,
  setGameStatus,
  $gameState,
  $currentTimer,
} from "./model";

export class GameLoop {
  constructor() {
    this.count = 1;
    this.animateId = null;
  }

  start(state, context) {
    const { traversedVertexes, vertexesCount } = state;
    const gameState = $gameState.getState();
    const fps = $currentTimer.getState();
    clearTimeout(this.animateId);

    if (gameState === gameStatus.END_GAME) {
      return;
    }

    if (gameState === gameStatus.PAUSE) {
      clearTimeout(this.animateId);
      return;
    }

    if (this.count < traversedVertexes.visited.length) {
      renderBarrier(traversedVertexes.visited[this.count], context, "#afeeee");

      if (this.count < traversedVertexes.visited.length - 1) {
        renderBarrier(
          traversedVertexes.queue[this.count],
          context,
          "rgb(152, 251, 152)"
        );
      }

      this.animateId = setInterval(
        () => this.start({ traversedVertexes, vertexesCount }, context),
        this.getFps(fps)
      );

      clearCanvas.watch(() => clearTimeout(this.animateId));

      this.count++;
    } else {
      setGameStatus(gameStatus.END_GAME);
      this.clear();
      const { path } = $path.getState();
      renderPath({
        path,
        context,
      });
    }
  }

  getFps(fps) {
    const newFps = parseInt(fps) === 1 ? fps : fps * 10;
    return 1000 / newFps;
  }

  clear() {
    // cancelAnimationFrame(this.animateId);
    this.count = 1;
    this.animateId = null;
  }

  removeAnimation() {
    clearTimeout(this.animateId);
  }
}

export const gameLoop = new GameLoop();
