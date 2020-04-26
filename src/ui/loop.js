import { clearCanvas } from "../graph";
import { renderBarrier, renderPath } from "../canvas";
import { gameStatus, $path, setGameStatus, $gameState } from "./model";

export class GameLoop {
  constructor() {
    this.count = 0;
    this.animateId = null;
  }

  start(state, context) {
    const { traversedVertexes, stepCounter } = state;
    const gameState = $gameState.getState();

    if (gameState.ref === gameStatus.PAUSE) {
      cancelAnimationFrame(this.animateId);
      return;
    }

    // if (gameState.ref === gameStatus.RESUME) {
    // }

    // if (gameState === gameStatus.RESTART) {
    //   this.clear();
    //   setGameStatus(gameStatus.START);
    //   return;
    // }

    if (this.count < stepCounter) {
      renderBarrier(traversedVertexes[this.count], context, "#ffff0061");

      this.animateId = requestAnimationFrame(() =>
        this.start({ traversedVertexes, stepCounter }, context)
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
}

export const gameLoop = new GameLoop();
