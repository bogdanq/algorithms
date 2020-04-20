import { createEvent, createStore } from "effector";
import { cellSize, borderSize } from "./config";

export const setObstacle = createEvent();
export const removeObstacleByIndex = createEvent();
export const $obstacle = createStore({});
export const start = createEvent();

$obstacle
  .on(setObstacle, (state, index) => {
    return {
      ...state,
      [index]: true,
    };
  })
  .on(removeObstacleByIndex, (state, index) => ({
    ...state,
    [index]: state[index] ? false : true,
  }))
  .watch(start);
