import {
  getPositionByIndex,
  drawSquare,
  colorSchema,
  BarrierType,
} from "../config";
import { drawSquareWithAnimation, drawMarkerWithAnimation } from "./animations";

export class BarierItem {
  public barrierType: BarrierType;
  public index: number;
  public canDrawe: boolean;
  public context: null | any;
  public canRemove: boolean;
  public position: boolean | [number, number];

  constructor(index: number, barrierType: BarrierType) {
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

    drawMarkerWithAnimation({
      position: this.position,
      context: this.context,
    });

    this.canRemove = false;
  }
}
