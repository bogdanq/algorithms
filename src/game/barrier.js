import { getPositionByIndex, drawSquare, colorSchema } from "../config";
import { drawSquareWithAnimation, drawMarkerWithAnimation } from "./animations";

export class Barier {
  constructor(index) {
    this.index = index;
    this.canDrawe = false;
    this.context = null;
    this.canRemove = false;
    this.position = false;
  }

  getBarier() {
    return this;
  }

  getIndex() {
    return this.index;
  }

  render(context) {
    this.context = context;
    this.position = getPositionByIndex(this.index);

    if (!this.canRemove) {
      if (!this.canDrawe) {
        drawSquareWithAnimation({
          position: this.position,
          context,
          color: colorSchema.blockColor,
          width: 20,
        });
      } else {
        drawSquare({
          position: this.position,
          context,
          color: colorSchema.blockColor,
        });
      }

      this.canDrawe = true;
    }
  }

  remove() {
    this.canRemove = true;

    drawMarkerWithAnimation({
      position: this.position,
      context: this.context,
    });
  }
}
