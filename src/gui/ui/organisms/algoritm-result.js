import React from "react";
import { sample, createStore } from "effector";
import { $path, endGame } from "../../../game";
import { useStore } from "effector-react";

const $graphState = createStore({});

sample({
  source: $path,
  clock: endGame,
  target: $graphState,
});

export function AlgotitmResult() {
  const graphState = useStore($graphState);

  return (
    <div className="info-wrapper">
      <h3 className="select-bar_info">
        Количество итераций: <span>{graphState?.count || 0}</span>
      </h3>
      <h3 className="select-bar_info">
        Время прохождения:
        <span> {graphState?.timeEnd?.toFixed(4) || 0} ms</span>
      </h3>
      <h3 className="select-bar_info">
        Длина пути: <span>{graphState?.path?.length || 0}</span>
      </h3>
    </div>
  );
}
