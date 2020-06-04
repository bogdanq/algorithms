import {
  sample,
  guard,
  restore,
  createDomain,
  combine,
  Event,
  Store,
} from "effector";
import _ from "lodash";
import { AlgoritmController } from "algoritms/controller";
import {
  $graph,
  resetStore,
  clearCanvas,
  $barriers,
  $startEndPosition,
  BarierItem,
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

type Path = {
  path: number[];
  timeEnd: number;
} & AlgoritmController;

type SetHistoryGame = {
  path: Path | null;
  currentAlgoritm: string;
  graph: CombidenGraphType;
};

type HistoryGame = {
  barrier: Array<BarierItem>;
  startEndPosition: [number, number];
  currentAlgoritm: string;
  index: string;
  timeEnd?: string;
  path?: number[];
  count?: number;
};

const gameDomain = createDomain("game");

export const setGameStatus: Event<GameStatus> = gameDomain.event();

export const setTimer: Event<number> = gameDomain.event();

export const setHistoryGame: Event<SetHistoryGame> = gameDomain.event();

export const recoveryHistoryGame: Event<number> = gameDomain.event();

export const setCurrentGame: Event<number> = gameDomain.event();

export const $path: Store<Path | null> = gameDomain
  .store(null)
  .reset(resetStore, clearCanvas);

export const $historyGame: Store<Array<HistoryGame>> = gameDomain.store([]);

export const $currentTimer: Store<number> = gameDomain
  .store(15)
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

export const $currentGame: Store<number | null> = restore(
  setCurrentGame,
  null
).reset(resetStore);

export const $gameState: Store<GameStatus> = restore(
  setGameStatus,
  GameStatus.RESET
).reset(resetStore);

export const startGame: Event<GameStatus> = guard({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.START),
});

export const resumeGame: Event<GameStatus> = guard({
  source: $gameState,
  filter: $gameState.map((state) => state === GameStatus.RESUME),
});

export const endGame: Event<GameStatus> = guard({
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

sampleForHistoryGame<Array<BarierItem>>($barriers, "barrier");
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
