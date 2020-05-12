import { colorSchema, getPositionByIndex, drawSquare } from "../config";

export function drowStartEndPositions(startEndPosition, context) {
  for (let i = 0; i < startEndPosition.length; i++) {
    const index = getPositionByIndex(startEndPosition[i]);

    drawSquare({
      position: index,
      context,
      color: colorSchema.startEndColor[i],
    });
  }
}
