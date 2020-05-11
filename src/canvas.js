import { guard, sample, merge, combine, forward } from "effector";
import {
  colorSchema,
  cellSize,
  pageHeight,
  pageWidth,
  borderSize,
  getLocalSize,
  getGlobalSize,
  drawSquare,
  clearALlCanvas,
  getPositionByIndex,
  getIndexByPosition,
  ceilType,
  convertLocalPositionToGlobal,
} from "./config";
import { configureCanvas } from "./config-canvas";
import { canvasControl } from "./control-canvas";
import {
  setBarrier,
  removeBarrierItem,
  triggerStartPosition,
  triggerEndPosition,
  $graph,
  resetStore,
  clearCanvas,
  $barrierType,
} from "./graph";

import {
  gameStatus,
  $gameState,
  $path,
  renderVisitedVertexByArr,
  renderVisitedVertex,
  createTick,
} from "./game";
import { $visitedVertex, $processedVertex } from "./algoritms";

const $mainState = combine({
  visitedVertex: $visitedVertex,
  graph: $graph,
  processedVertex: $processedVertex,
  barrierType: $barrierType,
});

export function renderBarrier(barriers, barrierType, context) {
  renderWater(barriers[ceilType.WATER], context);
  renderBar(barriers[ceilType.BARIER], context);
}

function renderWater(barriers, context) {
  for (let i = 0; i < barriers.length; i++) {
    barriers[i].render(context, "#73c8ef");
  }
}
function renderBar(barriers, context) {
  for (let i = 0; i < barriers.length; i++) {
    barriers[i].render(context);
  }
}

function renderActionsCeil(startEndPosition, context) {
  for (let i = 0; i < startEndPosition.length; i++) {
    const index = getPositionByIndex(startEndPosition[i]);
    drawSquare({
      position: index,
      context,
      color: colorSchema.startEndColor[i],
    });
  }
}

function renderCeil(event, state) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);

  const { graph, barrierType } = state;

  const [startIndex, endIndex] = graph.startEndPosition;

  return {
    renderForMove: () => {
      if (index !== startIndex && index !== endIndex) {
        setBarrier({ index, type: barrierType });
      }
    },
    renderForClick: () => {
      if (index !== startIndex && index !== endIndex) {
        removeBarrierItem({ index, type: barrierType });
      }
    },
  };
}

function renderStart(index, { graph }) {
  const findIndex = graph.barrier.find((barrier) => barrier.index === index);
  const [, endIndex] = graph.startEndPosition;

  if (!findIndex && index !== endIndex) {
    triggerStartPosition(index);
  }
}

function renderEnd(index, { graph }) {
  const findIndex = graph.barrier.find((barrier) => barrier.index === index);
  const [startIndex] = graph.startEndPosition;

  if (!findIndex && index !== startIndex) {
    triggerEndPosition(index);
  }
}

let type = null;
function renderLogic(event, state) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);
  const { graph } = state;

  if (!type) {
    type = graph.graph[index].type;
  }

  switch (type) {
    case ceilType.BARIER:
      type = null;
      return renderCeil(event, state).renderForClick();
    case ceilType.WATER:
      type = null;
      return renderCeil(event, state).renderForClick();
    case ceilType.START_POSITION:
      return renderStart(index, state);
    case ceilType.END_POSITION:
      return renderEnd(index, state);
    case ceilType.EMPTY:
      type = null;
      return renderCeil(event, state).renderForMove();
  }
}

export function renderCanvas(canvas, context) {
  const localSize = getLocalSize(pageWidth, pageHeight);
  const globalSize = getGlobalSize(localSize.w, localSize.h);
  const gridData = buildGrid(context);

  configureCanvas(canvas, globalSize);

  canvasControl.registerClickEventToCanvas(canvas);
  canvasControl.addMouseMoveEvent(renderLogic);
  canvasControl.addMouseUpEvent(() => (type = null));
  canvasControl.addMouseClickEvent((e, s) => renderCeil(e, s).renderForClick());

  function render({ graph, visitedVertex, processedVertex, barrierType }) {
    clearALlCanvas(context, canvas);
    canvasControl.setState({ graph, barrierType });

    renderVisitedVertexByArr(visitedVertex, context, "#00bcd4");
    renderVisitedVertexByArr(processedVertex.siblings, context, "#d2ef99");
    renderVisitedVertex(processedVertex.vertex, context, "#f3fc23");

    renderActionsCeil(graph.startEndPosition, context);

    renderBarrier(graph.barriersList, barrierType, context);

    gridData.applyStyles();
    context.stroke(gridData.grid);
  }

  $mainState.watch(render);

  sample({
    source: $mainState,
    clock: merge([resetStore, clearCanvas]),
  }).watch(render);

  createTick($path, context);
}

let prev = null;
export function renderPath({ context, path = [], color = "green" }) {
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
