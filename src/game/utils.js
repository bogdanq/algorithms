import { ru } from "date-fns/locale";
import { formatWithOptions } from "date-fns/fp";

export function checkGameStatus(target, status) {
  return status.some((item) => target === item);
}

export function filtredFps(_, fps) {
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
