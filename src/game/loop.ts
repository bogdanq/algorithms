import {
  createEffect,
  attach,
  createStore,
  sample,
  guard,
  combine,
  merge,
} from "effector";
import { clearCanvas, resetStore } from "../graph";
import { checkGameStatus } from "./utils";
import {
  GameStatus,
  $gameState,
  $currentTimer,
  startGame,
  resumeGame,
} from "./model";
import { animatedVisitedVertex } from "./animated-vertex";

const tickFx = createEffect().use(
  (fps) => new Promise((rs) => setTimeout(rs, 1000 / (fps * 2)))
);

export function createTick($state, context) {
  const $animationCount = createStore(0).reset(clearCanvas, resetStore);

  const tickWithParams = attach({
    effect: tickFx,
    source: $currentTimer,
    mapParams: (_, fps) => fps,
  });

  const $combineState = combine(
    $state,
    $animationCount,
    (state, animationCount) => ({ state, animationCount })
  );

  $animationCount.on(tickWithParams.done, (state) => state + 1);

  sample($combineState, tickWithParams).watch((state) => {
    animatedVisitedVertex.setVertex(state, context);
  });

  guard({
    source: merge([startGame, resumeGame, tickWithParams.done]),
    filter: $gameState.map((state) =>
      checkGameStatus(state, [GameStatus.RESUME, GameStatus.START])
    ),
    target: tickWithParams,
  });
}
