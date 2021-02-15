import { createEvent, createStore, combine, sample } from "effector";
import { $currentAlgoritm, AlgoritmName } from "algoritms";
import { $graph, GraphType, BarrierItem } from "graph";

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
  clock: endGame,
  target: setGameHistory.prepend((state: CompletedGameState) => ({
    ...state,
    image: screenCanvas(),
  })),
});

// @TODO need refactor
sample({
  // @ts-ignore
  source: $gameHistory,
  clock: recoveryGameHistory,
  target: $currentAlgoritm,
  fn: (history, id) => {
    const findedGame = history.find((_, index) => index === id);

    if (!findedGame) {
      return null;
    }

    const { currentAlgoritm } = findedGame;

    return currentAlgoritm;
  },
});

sample({
  // @ts-ignore
  source: $gameHistory,
  clock: recoveryGameHistory,
  target: $graph,
  fn: (history, id) => {
    const findedGame = history.find((_, index) => index === id);

    if (!findedGame) {
      return null;
    }

    const { graph } = findedGame;

    return graph;
  },
});

sample({
  // @ts-ignore
  source: $gameHistory,
  clock: recoveryGameHistory,
  target: $path,
  fn: (history, id) => {
    const findedGame = history.find((_, index) => index === id);

    if (!findedGame) {
      return null;
    }

    const { path } = findedGame;

    return path;
  },
});
