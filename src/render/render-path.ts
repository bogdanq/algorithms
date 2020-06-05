import {
  getPositionByIndex,
  convertLocalPositionToGlobal,
  cellSize,
} from "../config";

type RenderPath = {
  context: CanvasRenderingContext2D;
  path: number[];
  color?: string;
};

let prev: null | [number, number] = null;
export function renderPath({
  context,
  path = [],
  color = "green",
}: RenderPath) {
  for (let i = 0; i < path.length; i++) {
    const position = getPositionByIndex(path[i]);
    const [x, y] = convertLocalPositionToGlobal(position);

    if (prev) {
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.moveTo(prev[0], prev[1]);
      context.lineTo(x + cellSize / 2, y + cellSize / 2);
      context.stroke();
    }

    prev = [x + cellSize / 2, y + cellSize / 2];
  }

  prev = null;
}
