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
  (fps) => new Promise((rs) => setTimeout(rs, 1000 / fps))
);

export function createTick(store, context) {
  const $animationCount = createStore(0).reset(clearCanvas, resetStore);

  const tickWithParams = attach({
    effect: tickFx,
    source: $currentTimer,
    mapParams: (_, fps) => fps,
  });

  const $combineState = combine(
    store,
    $animationCount,
    (store, animationCount) => ({ state: store, animationCount })
  );

  $animationCount.on(tickWithParams.done, (state) => state + 1);

  sample($combineState, tickWithParams).watch((state) => {
    animatedVisitedVertex(state, context);
  });

  guard({
    source: merge([startGame, resumeGame]),
    filter: $gameState.map((state) =>
      checkGameStatus(state, gameStatus.RESUME, gameStatus.START)
    ),
    target: tickWithParams,
  });

  guard({
    source: tickWithParams.done,
    filter: $gameState.map((state) =>
      checkGameStatus(state, gameStatus.RESUME, gameStatus.START)
    ),
    target: tickWithParams,
  });
}

export function animatedVisitedVertex({ animationCount, state }, context) {
  const { processing } = state;

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
