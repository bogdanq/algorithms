import { createEvent, createStore } from "effector";
import { cellSize, borderSize } from "./config";

export const changeSellSize = createEvent();

export const changeBorderSize = createEvent();

export const $state = createStore({
  cellSize,
  borderSize
});

$state
  .on(changeSellSize, (state, payload) => ({
    ...state,
    cellSize: payload
  }))
  .on(changeBorderSize, (state, payload) => ({
    ...state,
    borderSize: payload
  }));
