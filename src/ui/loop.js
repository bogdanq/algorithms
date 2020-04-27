import { clearCanvas } from "../graph";
import { renderBarrier, renderPath } from "../canvas";
import {
  gameStatus,
  $path,
  setGameStatus,
  $gameState,
  $gameIsEnd,
} from "./model";

export class GameLoop {
  constructor() {
    this.count = 0;
    this.animateId = null;
  }

  start(state, context) {
    const { traversedVertexes, vertexesCount } = state;
    const gameState = $gameState.getState();
    const gameIsEnd = $gameIsEnd.getState();

    if (gameState === gameStatus.END_GAME) {
      // clearCanvas();
      return;
    }

    if (gameState === gameStatus.PAUSE) {
      cancelAnimationFrame(this.animateId);
      return;
    }

    if (gameState === gameStatus.RESUME && gameIsEnd) {
      cancelAnimationFrame(this.animateId);
      return;
    }

    if (this.count < vertexesCount) {
      renderBarrier(traversedVertexes[this.count], context, "#ffff0061");

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
    this.count = 0;
    this.animateId = null;
  }

  removeAnimation() {
    cancelAnimationFrame(this.animateId);
  }
}

export const gameLoop = new GameLoop();
