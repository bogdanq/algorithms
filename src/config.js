export const cellSize = 35;
export const pageWidth = window.innerWidth;
export const pageHeight = window.innerHeight;
export const borderSize = 0.5;
export const boardLength = pageWidth * pageHeight;
export const startPosition = 0;
export const endPosition = 110;

export const colorSchema = {
  borderColor: "#000",
  blockColor: "#8080805c",
  startEndColor: ["green", "red"],
};

export const ceilType = {
  START_POSITION: "START_POSITION",
  END_POSITION: "END_POSITION",
  BARIER: "BARIER",
  EMPTY: "EMPTY",
  VISITED: "VISITED",
};

export function getLocalSize(w, h) {
  return {
    w: Math.floor(w / cellSize),
    h: Math.floor(h / cellSize),
  };
}

export function getGlobalSize(w, h) {
  return {
    w: Math.floor(w * cellSize),
    h: Math.floor(h * cellSize),
  };
}

export function convertLocalPositionToGlobal([x, y]) {
  return [x * cellSize, y * cellSize];
}

export function drawSquare({
  color = "rgb(152, 251, 152)",
  position,
  context,
}) {
  const [x, y] = convertLocalPositionToGlobal(position);
  const size = cellSize - borderSize * 2;

  context.fillStyle = color;
  context.fillRect(x + borderSize * 2, y + borderSize * 2, size, size);
}

export function clearALlCanvas(context, canvas) {
  return context.clearRect(0, 0, canvas.width, canvas.height);
}

export function getIndexByPosition([x, y]) {
  const { w } = getLocalSize(pageWidth, pageHeight);

  return y * w + x;
}

export function getPositionByIndex(index) {
  const { w } = getLocalSize(pageWidth, pageHeight);
  const y = Math.floor(index / w);
  const x = index - y * w;

  return [x, y];
}

export function getTargetIndex(event) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);

  return index;
}