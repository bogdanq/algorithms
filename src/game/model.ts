import { sample, guard, restore, createDomain, combine, Store } from "effector";
import _ from "lodash";
import { AlgoritmController } from "algoritms/controller";
import {
  $graph,
  resetStore,
  clearCanvas,
  $barriers,
  $startEndPosition,
  BarrierItem,
  CombidenGraphType,
} from "../graph";
import { $searchAlgoritm, $currentAlgoritm } from "../algoritms/model";
import { graphControll } from "../graph/controller";
import { filtredFps } from "./utils";

export enum GameStatus {
  START = "START",
  RESTART = "RESTART",
  PAUSE = "PAUSE",
  RESUME = "RESUME",
  CLEAR = "CLEAR",
  END_GAME = "END_GAME",
  RESET = "RESET",
}

export type Path = {
  path: number[];
  timeEnd: number;
} & AlgoritmController;

type SetHistoryGame = {
  path: Path | null;
  currentAlgoritm: string;
  graph: CombidenGraphType;
};

export type HistoryGame = {
  barrier: Array<BarrierItem>;
  startEndPosition: [number, number];
  currentAlgoritm: string;
  index: string;
  timeEnd?: string;
  path?: number[];
  count?: number;
};

const gameDomain = createDomain("game");

export const setGameStatus = gameDomain.event<GameStatus>();

export const setTimer = gameDomain.event<number>();

export const setHistoryGame = gameDomain.event<SetHistoryGame>();

export const recoveryHistoryGame = gameDomain.event<number>();

export const setCurrentGame = gameDomain.event<number>();

export const $path = gameDomain
  .store<Path | null>(null)
  .reset(resetStore, clearCanvas);

export const $historyGame = gameDomain.store<Array<HistoryGame>>([]);

export const $currentTimer = gameDomain
  .store<number>(15)
  .on(setTimer, filtredFps);

const $stateForRecoverHistory = combine({
  path: $path,
  currentAlgoritm: $currentAlgoritm,
  graph: $graph,
});

$historyGame.on(
  setHistoryGame,
  (state, { currentAlgoritm, path, graph: { barrier, startEndPosition } }) => {
    const nextGame = {
      barrier,
      startEndPosition,
      currentAlgoritm,
      index: path?.timeEnd.toFixed(1) + currentAlgoritm,
      timeEnd: path?.timeEnd.toFixed(1),
      path: path?.path,
      count: path?.count,
    };

    const findedGame = _.find(state, nextGame);

    return findedGame ? state : [...state, nextGame];
  }
);

export const $currentGame = restore<number | null>(setCurrentGame, null).reset(
  resetStore
);

export const $gameState = restore<GameStatus>(
  setGameStatus,
  GameStatus.RESET
).reset(resetStore);

export const startGame = guard<GameStatus>({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.START),
});

export const resumeGame = guard<GameStatus>({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.RESUME),
});

export const endGame = guard<GameStatus>({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.END_GAME),
});

const restoredHistoryGame = guard({
  source: recoveryHistoryGame,
  filter: $gameState.map(
    (state) => state === GameStatus.END_GAME || state === GameStatus.RESET
  ),
});

guard({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.CLEAR),
  target: resetStore,
});

guard({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.START),
  target: clearCanvas,
});

sample({
  // @ts-ignore
  source: $stateForRecoverHistory,
  clock: endGame,
  target: setHistoryGame,
});

sample({
  source: combine({
    graph: $graph,
    algoritm: $searchAlgoritm,
  }),
  clock: startGame,
  target: $path,
  fn: ({ graph, algoritm }) => {
    if (!algoritm) {
      return {};
    }

    const [start, end] = graph.startEndPosition;

    const time = window.performance.now();
    const result = algoritm.searchFunction(
      start,
      end,
      graph.graph,
      graphControll
    );
    const timeEnd = window.performance.now() - time;

    return {
      ...result,
      timeEnd,
    };
  },
});

sampleForHistoryGame<Array<BarrierItem>>($barriers, "barrier");
sampleForHistoryGame<[number, number]>($startEndPosition, "startEndPosition");
sampleForHistoryGame<number | null>($currentGame, "index");
sampleForHistoryGame<string>($currentAlgoritm, "currentAlgoritm");

function sampleForHistoryGame<T>(target: Store<T>, key: keyof HistoryGame) {
  return sample({
    //@ts-ignore
    source: $historyGame,
    clock: restoredHistoryGame,
    //@ts-ignore
    target,
    fn: (historyGame, index) => {
      const findedGame = historyGame.find(
        (game) => Number(game.index) === index
      );

      return findedGame ? findedGame[key] : null;
    },
  });
}
