import React from "react";
import { sample, createStore } from "effector";
import { useStore } from "effector-react";
import { $path, endGame, Path } from "../../../game";

const $graphState = createStore<Path | null>(null);

sample({
  source: $path,
  clock: endGame,
  target: $graphState,
});

export function AlgotitmResult() {
  const graphState = useStore($graphState);

  return (
    <>
      <h3 className="select-bar_info">
        Количество итераций: <span>{graphState?.count || 0}</span>
      </h3>
      <h3 className="select-bar_info">
        Время прохождения:
        <span> {graphState?.timeEnd} ms</span>
      </h3>
      <h3 className="select-bar_info">
        Длина пути: <span>{graphState?.path?.length || 0}</span>
      </h3>
    </>
  );
}
