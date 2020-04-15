import {
  colorSchema,
  cellSize,
  pageHeight,
  pageWidth,
  borderSize,
  getLocalSize,
  getGlobalSize,
  drawSquare
} from "./config";

const canvas = document.getElementById("viewport");

export function renderCanvas({ cellSize, borderSize }) {
  if (canvas) {
    const context = canvas.getContext("2d");

    const gridData = buildGrid(context);

    gridData.applyStyles();
    context.stroke(gridData.grid);

    // drawSquare({ context, position: [0, 0] });
    // drawSquare({ context, position: [0, 1] });
    // drawSquare({ context, position: [0, 2] });
    // drawSquare({ context, position: [0, 3] });
  }
}

function buildGrid(context) {
  const grid = new Path2D();

  const localSize = getLocalSize(pageWidth, pageHeight);
  const globalSize = getGlobalSize(localSize.w, localSize.h);

  for (let i = 0; i <= localSize.w; i++) {
    grid.moveTo(i * cellSize + borderSize, 0);
    grid.lineTo(i * cellSize + borderSize, globalSize.h);
  }

  for (let i = 0; i <= localSize.h; i++) {
    grid.moveTo(0, i * cellSize + borderSize);
    grid.lineTo(globalSize.w, i * cellSize + borderSize);
  }

  return {
    grid,
    applyStyles: () => {
      context.lineWidth = borderSize;
      context.strokeStyle = colorSchema.borderColor;
    }
  };
}

function getGraph() {
  const { w, h } = getLocalSize(pageWidth, pageHeight);
  const cellCount = w * h;
  const graph = {};

  for (let i = 0; i < cellCount; i++) {
    graph[i] = [
      getRightNeigbour(i),
      getLeftNeigbour(i),
      getTopNeigbour(i),
      getDownNeigbour(i)
    ].filter(Boolean);
  }

  return graph;
}

function getDownNeigbour(index) {
  const { w, h } = getLocalSize(pageWidth, pageHeight);

  const hasDownNeighbour = Math.floor(index / w) < h - 1;

  if (hasDownNeighbour) {
    return index + w;
  }
}

function getTopNeigbour(index) {
  const { w } = getLocalSize(pageWidth, pageHeight);

  const hasTopNeighbour = Math.floor(index / w) > 0;

  if (hasTopNeighbour) {
    return index - w;
  }
}

function getRightNeigbour(index) {
  const { w } = getLocalSize(pageWidth, pageHeight);

  const hasRightNeighbour = index % w < w - 1;

  if (hasRightNeighbour) {
    return index + 1;
  }
}

function getLeftNeigbour(index) {
  const { w } = getLocalSize(pageWidth, pageHeight);

  const hasLeftNeighbour = index % w > 0;

  if (hasLeftNeighbour) {
    return index - 1;
  }
}

console.log(getGraph());

// const graph = {
//   0: [1, 3, 6, 2],
//   1: [0, 2, 4],
//   2: [1, 5],
//   3: [0, 4],
//   4: [1, 3, 5, 7],
//   5: [2, 4, 8],
//   6: [3, 7],
//   7: [4, 6, 8],
//   8: [5, 7],
// }

// function fillEmptyCell() {
//   graph
//     .getVertexes()
//     .filter((v) => v.value.type === PLACE_TYPE.EMPTY)
//     .forEach((v) => {
//       drawSquare({
//         context,
//         position: getPositionByIndex(v.index),
//         color: colorScheme.emptyCells,
//       })
//     })
// }
