import { colorSchema, getPositionByIndex, drawSquare } from "../config";

export function drowStartEndPositions(
  startEndPosition: [number, number],
  context: CanvasRenderingContext2D
) {
  for (let i = 0; i < startEndPosition.length; i++) {
    const index = getPositionByIndex(startEndPosition[i]);

    drawSquare({
      position: index,
      context,
      color: colorSchema.startEndColor[i],
    });
  }
}
