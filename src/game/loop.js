import { clearCanvas } from "../graph";
import { renderPath } from "../canvas";
import {
  gameStatus,
  $path,
  setGameStatus,
  $gameState,
  $currentTimer,
} from "./model";
import { renderVisitedVertex } from "./utils";

export class GameLoop {
  constructor() {
    this.count = 1;
    this.animateId = null;
  }

  start(path, context) {
    const { visited, processing } = path;
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

    if (this.count < visited.length) {
      renderVisitedVertex(visited[this.count], context, "#afeeee");

      if (this.count < visited.length - 1) {
        renderVisitedVertex(
          processing[this.count],
          context,
          "rgb(152, 251, 152)"
        );
      }

      this.animateId = setInterval(
        () => this.start({ visited, processing }, context),
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
    const newFps = fps === 1 ? fps : fps * 10;
    return 1000 / newFps;
  }

  clear() {
    this.count = 1;
    this.animateId = null;
  }

  removeAnimation() {
    clearTimeout(this.animateId);
  }
}

export const gameLoop = new GameLoop();
