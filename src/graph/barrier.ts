import { getPositionByIndex, drawSquare, colorSchema } from "../config";
import { drawSquareWithAnimation, drawMarkerWithAnimation } from "./animations";

export class BarierItem {
  constructor(index, barrierType) {
    this.barrierType = barrierType;
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

  render(context, color = colorSchema.blockColor) {
    this.context = context;
    this.position = getPositionByIndex(this.index);

    if (!this.canRemove) {
      if (!this.canDrawe) {
        drawSquareWithAnimation({
          position: this.position,
          context,
          color,
          width: 20,
        });
      } else {
        drawSquare({
          position: this.position,
          context,
          color,
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

    this.canRemove = false;
  }
}
