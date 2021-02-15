import {
  createEffect,
  attach,
  createStore,
  sample,
  guard,
  combine,
  merge,
  Store,
  Effect,
} from "effector";

import { clearCanvas, resetStore } from "../graph";
import { checkGameStatus } from "./utils";
import {
  GameStatus,
  $gameState,
  $currentTimer,
  startGame,
  resumeGame,
  Path,
} from "./models";
import { animatedVisitedVertex } from "./animated-vertex";

const tickFx = createEffect<number, number>().use(
  (fps: number) => new Promise((rs) => setTimeout(rs, 1000 / (fps * 2)))
);

export function createTick($state: Store<Path | null>, context: any) {
  const $animationCount = createStore<number>(0).reset(clearCanvas, resetStore);

  const tickWithParams = attach<
    GameStatus,
    Store<number>,
    Effect<number, number>
  >({
    source: $currentTimer,
    effect: tickFx,
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
