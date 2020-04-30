import {
  getPositionByIndex,
  drawSquare,
  colorSchema,
  drawMark,
} from "../config";

export function checkGameStatus(target, ...status) {
  return status.some((item) => target === item);
}

export class Barier {
  constructor(index) {
    this.index = index;
    this.isDrawed = false;
    this.context = null;
    this.isRemove = false;
  }

  getBarier() {
    return this;
  }

  getIndex() {
    return this.index;
  }

  render(context) {
    this.context = context;
    const [x, y] = getPositionByIndex(this.index);

    if (!this.isRemove) {
      if (!this.isDrawed) {
        drawSquareWithAnimation({
          position: [x, y],
          context,
          color: colorSchema.blockColor,
          width: 20,
        });
      } else {
        drawSquare({
          position: [x, y],
          context,
          color: colorSchema.blockColor,
        });
      }

      this.isDrawed = true;
    }
  }

  remove() {
    this.isRemove = true;
    const [x, y] = getPositionByIndex(this.index);
    drawSquareWithAnimationMin({
      position: [x, y],
      context: this.context,
      color: "red",
      width: 15,
    });
  }
}

function drawSquareWithAnimation({
  position: [x, y],
  context,
  color,
  width,
  scale = 0.3,
}) {
  let widthC = width;
  let animateId;
  let scaleN = scale;

  if (width < 35) {
    animateId = requestAnimationFrame(() =>
      drawSquareWithAnimation({
        position: [x, y],
        context,
        color,
        width: widthC,
        scale: scaleN,
      })
    );

    drawSquare({
      position: [x + scaleN, y + scaleN],
      context,
      color,
      width: widthC,
    });

    if (scaleN > 0 && widthC % 5 === 0) {
      scaleN = scaleN - 0.1;
    }

    widthC++;
  } else {
    cancelAnimationFrame(animateId);
  }
}

function drawSquareWithAnimationMin({
  position: [x, y],
  context,
  color,
  width,
}) {
  let widthC = width;
  let animateId;

  if (width < 34) {
    animateId = requestAnimationFrame(() =>
      drawSquareWithAnimationMin({
        position: [x, y],
        context,
        color,
        width: widthC,
      })
    );

    drawMark({
      position: [x, y],
      context,
      color,
      width: widthC,
    });

    widthC++;
  } else {
    drawSquare({
      position: [x, y],
      context,
      color: "#fff",
      width: 0,
    });
    cancelAnimationFrame(animateId);
  }
}
