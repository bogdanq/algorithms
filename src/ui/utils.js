import { getPositionByIndex, drawSquare, colorSchema } from "../config";

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

function drawSquareWithAnimation({ position, context, color, width }) {
  let widthC = width;
  let animateId;

  if (width < 34) {
    animateId = requestAnimationFrame(() =>
      drawSquareWithAnimation({
        position,
        context,
        color,
        width: widthC,
      })
    );

    drawSquare({
      position,
      context,
      color,
      width: widthC,
    });
    widthC++;
  } else {
    cancelAnimationFrame(animateId);
  }
}

function drawSquareWithAnimationMin({ position, context, color, width }) {
  let widthC = width;
  let animateId;

  if (width < 34) {
    animateId = requestAnimationFrame(() =>
      drawSquareWithAnimationMin({
        position,
        context,
        color,
        width: widthC,
      })
    );

    drawSquare({
      position,
      context,
      color,
      width: widthC,
    });
    widthC++;
  } else {
    drawSquare({
      position,
      context,
      color: "#fff",
      width: 0,
    });
    cancelAnimationFrame(animateId);
  }
}
