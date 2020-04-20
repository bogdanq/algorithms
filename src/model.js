import { createEvent, createStore } from "effector";

export const setBarrier = createEvent();
export const removeBarrierItem = createEvent();
export const $barrier = createStore({});
export const start = createEvent();

$barrier
  .on(setBarrier, (state, index) => {
    return {
      ...state,
      [index]: true,
    };
  })
  .on(removeBarrierItem, (state, index) => ({
    ...state,
    [index]: state[index] ? false : true,
  }))
  .watch(start);
