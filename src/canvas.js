import { combine, sample } from "effector";
import {
  colorSchema,
  cellSize,
  pageHeight,
  pageWidth,
  borderSize,
  getLocalSize,
  getGlobalSize,
  drawSquare,
  clearCanvas,
  getPositionByIndex,
  getIndexByPosition,
} from "./config";
import { configureCanvas } from "./config-canvas";
import { canvasControl } from "./control-canvas";
import { setObstacle, $obstacle, start, removeObstacleByIndex } from "./model";

const $state = combine({
  obstacle: $obstacle,
});

function renderObstacle(obstacle, context) {
  for (const key in obstacle) {
    if (obstacle[key]) {
      const [x, y] = getPositionByIndex(key);
      drawSquare({
        position: [x, y],
        context,
        color: colorSchema.blockColor,
      });
    }
  }
}

function renderCeil(event) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);

  return {
    renderForMove: () => setObstacle(index),
    renderForClick: () => removeObstacleByIndex(index),
  };
}

export function renderCanvas(canvas, context) {
  const localSize = getLocalSize(pageWidth, pageHeight);
  const globalSize = getGlobalSize(localSize.w, localSize.h);
  const gridData = buildGrid(context);

  configureCanvas(canvas, globalSize);

  canvasControl.registerClickEventToCanvas(canvas);
  canvasControl.addMouseMoveEvent((e) => renderCeil(e).renderForMove());
  canvasControl.addMouseClickEvent((e) => renderCeil(e).renderForClick());

  function render(state) {
    clearCanvas(context, canvas);

    renderObstacle(state.obstacle, context);

    gridData.applyStyles();
    context.stroke(gridData.grid);
  }

  sample($state, start).watch((state) => render(state));

  start();
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
    },
  };
}

const canvas = document.getElementById("viewport");

if (canvas) {
  const context = canvas.getContext("2d");

  renderCanvas(canvas, context);
}

function getGraph() {
  const { w, h } = getLocalSize(pageWidth, pageHeight);
  const cellCount = w * h;
  const graph = {};
  let positionWithHeight = 0;
  let positionWithWidth = 0;

  for (let index = 0; index < cellCount; index++) {
    const hasNextLine = !Boolean((index + 1) % w);
    const hasNextColumn = !hasNextLine;

    graph[index] = {
      index,
      coordinates: [positionWithWidth, positionWithHeight],
      neighbors: [
        getLeftNeigbour(index),
        getTopNeigbour(index),
        getRightNeigbour(index),
        getDownNeigbour(index),
      ].filter((item) => typeof item !== "undefined"),
    };

    if (hasNextLine) {
      positionWithHeight++;
      positionWithWidth = 0;
    }

    if (hasNextColumn) {
      positionWithWidth++;
    }
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
