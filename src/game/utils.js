import { getPositionByIndex, drawSquare } from "../config";

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

export function equal(state, nextGame) {
  const hasNewBarriers = checkBarriers(state, nextGame.barrier);
  const hasNewPosition = checkPosition(state, nextGame.startEndPosition);

  if (hasNewPosition || hasNewBarriers) {
    return true;
  }
  return false;
}

function checkBarriers(state, nextBarriers) {
  if (nextBarriers.length === 0) {
    return false;
  }

  if (state[state.length - 1]?.barrier.length !== nextBarriers?.length) {
    return true;
  }

  return false;
}

function checkPosition(position, nextPosition) {
  const equalPosition = [];
  const lastPosition = position[position.length - 1]?.startEndPosition;

  if (!lastPosition) {
    return true;
  }

  equalPosition.push(
    ...lastPosition.map((position, index) => {
      return position !== nextPosition[index];
    })
  );

  if (equalPosition.length === 0 || equalPosition.includes(true)) {
    return true;
  }

  return false;
}
