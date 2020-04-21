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
  startPosition,
  endPosition,
  ceilType,
} from "./config";
import { configureCanvas } from "./config-canvas";
import { canvasControl } from "./control-canvas";
import {
  setBarrier,
  start,
  removeBarrierItem,
  triggerStartPosition,
  triggerEndPosition,
  setGraph,
  $state,
} from "./model";
import { graphControll } from "./graph";

function renderBarrier(barrier, context) {
  for (let i = 0; i < barrier.length; i++) {
    const [x, y] = getPositionByIndex(barrier[i]);
    drawSquare({
      position: [x, y],
      context,
      color: colorSchema.blockColor,
    });
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

  return {
    renderForMove: () => setBarrier(index),
    renderForClick: () => removeBarrierItem(index),
  };
}

function renderStart(event, state) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);

  const findIndex = state.barrier.includes(index);
  const [startIndex, endIndex] = state.startEndPosition;

  if (!findIndex && index !== endIndex) {
    triggerStartPosition(index);
  }
}

function renderEnd(event, state, lastIndex) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);

  const findIndex = state.barrier.includes(index);
  const [startIndex, endIndex] = state.startEndPosition;

  if (!findIndex && index !== startIndex) {
    if (index === endIndex) {
      triggerEndPosition(index);
    }
  }
}

function renderLogic(event, state) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);
}

export function renderCanvas(canvas, context) {
  const localSize = getLocalSize(pageWidth, pageHeight);
  const globalSize = getGlobalSize(localSize.w, localSize.h);
  const gridData = buildGrid(context);

  configureCanvas(canvas, globalSize);

  canvasControl.registerClickEventToCanvas(canvas);
  canvasControl.addMouseMoveEvent((e, state) =>
    renderCeil(e, state).renderForMove()
  );
  // canvasControl.addMouseMoveEvent(renderStart);
  canvasControl.addMouseClickEvent((e) => renderCeil(e).renderForClick());

  function render(state) {
    clearCanvas(context, canvas);
    canvasControl.setState(state);

    renderActionsCeil(state.startEndPosition, context);
    renderBarrier(state.barrier, context);

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
