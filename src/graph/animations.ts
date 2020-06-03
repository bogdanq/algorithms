import { drawSquare, drawMark, cellSize } from "../config";

export function drawSquareWithAnimation(params: {
  position: [number, number];
  context: any;
  color?: string;
  width: number;
  scale?: number;
}) {
  let animateId;
  let {
    position: [x, y],
    width,
    scale = 0.3,
  } = params;

  if (width < cellSize) {
    animateId = requestAnimationFrame(() =>
      drawSquareWithAnimation({
        ...params,
        width,
        scale,
      })
    );

    drawSquare({
      ...params,
      position: [x + scale, y + scale],
    });

    if (scale > 0 && width % 5 === 0) {
      scale = scale - 0.1;
    }

    width++;
  } else {
    if (animateId) {
      cancelAnimationFrame(animateId);
    }
  }
}

export function drawMarkerWithAnimation(params) {
  let { width = cellSize - 10 } = params;
  let animateId;

  if (width < cellSize) {
    animateId = requestAnimationFrame(() =>
      drawMarkerWithAnimation({
        ...params,
        width,
      })
    );

    drawMark({
      ...params,
      width,
    });

    width++;
  } else {
    drawSquare({
      ...params,
      color: "#fff",
      width: 0,
    });

    cancelAnimationFrame(animateId);
  }
}
