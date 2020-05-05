import {
  createEffect,
  attach,
  createStore,
  sample,
  guard,
  combine,
  merge,
} from "effector";
import { renderPath } from "../canvas";
import { addVisitedVertex, addProcessedVertex } from "../algoritms";
import { clearCanvas, resetStore } from "../graph";
import { checkGameStatus } from "./utils";
import {
  gameStatus,
  setGameStatus,
  $gameState,
  $currentTimer,
  startGame,
  resumeGame,
} from "./model";

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
    animatedVisitedVertex(state, context);
  });

  guard({
    source: merge([startGame, resumeGame, tickWithParams.done]),
    filter: $gameState.map((state) =>
      checkGameStatus(state, [gameStatus.RESUME, gameStatus.START])
    ),
    target: tickWithParams,
  });
}

export function animatedVisitedVertex({ animationCount, state }, context) {
  const { processing = [] } = state;

  if (animationCount < processing.length) {
    addProcessedVertex(processing[animationCount]);

    if (processing[animationCount - 1]) {
      addVisitedVertex(processing[animationCount - 1].vertex);
    }
  } else {
    setGameStatus(gameStatus.END_GAME);

    renderPath({
      path: state.path,
      context,
    });
  }
}
