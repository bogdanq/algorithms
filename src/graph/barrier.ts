import {
  getPositionByIndex,
  drawSquare,
  colorSchema,
  BarrierType,
} from "../config";
import { drawSquareWithAnimation, drawMarkerWithAnimation } from "./animations";

export class BarrierItem {
  public barrierType: BarrierType;
  public index: number;
  public canDrawe: boolean;
  public context: null | CanvasRenderingContext2D;
  public canRemove: boolean;
  public position: null | [number, number];

  constructor(index: number, barrierType: BarrierType) {
    this.barrierType = barrierType;
    this.index = index;
    this.canDrawe = false;
    this.context = null;
    this.canRemove = false;
    this.position = null;
  }

  getBarier() {
    return this;
  }

  getIndex() {
    return this.index;
  }

  render(context: any, color = colorSchema.blockColor) {
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

    if (this.position && this.context) {
      drawMarkerWithAnimation({
        position: this.position,
        context: this.context,
      });
    }

    this.canRemove = false;
  }
}
