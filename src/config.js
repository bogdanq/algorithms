export const cellSize = 50;
export const pageWidth = 300;
export const pageHeight = 300;
export const borderSize = 1;
export const boardLength = pageWidth * pageHeight;

export const colorSchema = {
  emptyCells: "#0080007d",
  borderColor: "red"
  // borderColor: "rgba(0, 0, 0, 0.2)"
};

export function getLocalSize(w, h) {
  return {
    w: Math.floor(w / cellSize),
    h: Math.floor(h / cellSize)
  };
}

export function getGlobalSize(w, h) {
  return {
    w: Math.floor(w * cellSize),
    h: Math.floor(h * cellSize)
  };
}

export function convertLocalPositionToGlobal([x, y]) {
  return [x * cellSize, y * cellSize];
}

export function drawSquare({
  color = "rgb(152, 251, 152)",
  position,
  context
}) {
  const [x, y] = convertLocalPositionToGlobal(position);
  const size = cellSize - borderSize * 2;

  context.fillStyle = color;
  context.fillRect(x + borderSize * 2, y + borderSize * 2, size, size);
}
