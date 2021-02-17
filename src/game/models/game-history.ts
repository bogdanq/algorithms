import {
  createEvent,
  createStore,
  combine,
  sample,
  createEffect,
  forward,
} from "effector";
import { $currentAlgoritm, AlgoritmName } from "algoritms";
import {
  $graph,
  GraphType,
  BarrierItem,
  $barriers,
  $startEndPosition,
} from "graph";

import { screenCanvas } from "../utils";
import { $path, endGame, Path } from "./game";

export const MAX_HISTORI_LENGTH = 10;

export type CompletedGameState = {
  path: Path | null;
  currentAlgoritm: AlgoritmName;
  graph: {
    graph: GraphType;
    barrier: BarrierItem[];
    barrierType: string;
    startEndPosition: [number, number];
    canMoveDiagonal: boolean;
  };
  image: string;
};

export const setGameHistory = createEvent<CompletedGameState>();
export const recoveryGameHistory = createEvent<number>();

export const $gameHistory = createStore<CompletedGameState[]>([]);

export const recoveryGameHistoryFx = createEffect().use(
  () => new Promise((rs) => setTimeout(rs, 0))
);

export const $completedGameState = combine({
  path: $path,
  currentAlgoritm: $currentAlgoritm,
  graph: $graph,
  image: "",
});

$gameHistory.on(setGameHistory, (state, result) => {
  if (state.length >= MAX_HISTORI_LENGTH) {
    return [result, ...state.slice(1)];
  }

  return [result, ...state];
});

sample({
  source: $completedGameState,
  clock: recoveryGameHistoryFx.done,
  target: setGameHistory.prepend((state: CompletedGameState) => ({
    ...state,
    image: screenCanvas(),
  })),
});

const findedGameEvent = sample({
  source: $gameHistory,
  clock: recoveryGameHistory,
  fn: (history, id) => {
    const findedGame = history.find((_, index) => index === id);

    if (!findedGame) {
      return null;
    }

    return findedGame;
  },
});

$currentAlgoritm.on(findedGameEvent, (_, game) => game?.currentAlgoritm);
$barriers.on(findedGameEvent, (_, game) => game?.graph.barrier);
$startEndPosition.on(
  findedGameEvent,
  (_, game) => game?.graph.startEndPosition
);
$path.on(findedGameEvent, (_, game) => game?.path);

forward({
  from: endGame,
  to: recoveryGameHistoryFx,
});
