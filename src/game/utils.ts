import { ru } from "date-fns/locale";
import { formatWithOptions } from "date-fns/fp";
import type { GameStatus } from "./models";

export function checkGameStatus(target: GameStatus, status: Array<GameStatus>) {
  return status.some((item) => target === item);
}

export function filtredFps(_: number, fps: number) {
  const fpsVariant = {
    min: 1,
    max: 30,
  };

  if (fps < fpsVariant.min) {
    return fpsVariant.min;
  }
  if (fps >= fpsVariant.max) {
    return fpsVariant.max;
  }
  return fps;
}

export const formatter = formatWithOptions(
  { locale: ru },
  " dd-MM-yyyy | HH:mm:ss"
);

export const screenCanvas = () => {
  const canvas = document.querySelector("canvas");

  return canvas?.toDataURL() || "";
};
