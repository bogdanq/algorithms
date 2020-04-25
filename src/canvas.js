import { guard, sample, merge, combine } from "effector";
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
  convertLocalPositionToGlobal,
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
  $graph,
  resetStore,
} from "./model";
import { graphControll } from "./graph";
import { BFS } from "./algoritms/bred-first-search";
import { $path, $gameState, $clearGameState } from "./ui/model";

const $state = combine($graph, $path);

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

  const [startIndex, endIndex] = state.startEndPosition;

  return {
    renderForMove: () => {
      if (index !== startIndex && index !== endIndex) {
        setBarrier(index);
      }
    },
    renderForClick: () => {
      if (index !== startIndex && index !== endIndex) {
        removeBarrierItem(index);
      }
    },
  };
}

function renderStart(index, state) {
  const findIndex = state.barrier.includes(index);
  const [, endIndex] = state.startEndPosition;

  if (!findIndex && index !== endIndex) {
    triggerStartPosition(index);
  }
}

function renderEnd(index, state, lastIndex) {
  const findIndex = state.barrier.includes(index);
  const [startIndex] = state.startEndPosition;

  if (!findIndex && index !== startIndex) {
    triggerEndPosition(index);
  }
}

let type = null;
function renderLogic(event) {
  const { w, h } = getLocalSize(event.clientX, event.clientY);
  const index = getIndexByPosition([w, h]);
  const state = $graph.getState();

  if (!type) {
    type = state.graph[index].type;
  }

  switch (type) {
    case ceilType.BARIER:
      return renderCeil(event, state).renderForClick();
    case ceilType.START_POSITION:
      return renderStart(index, state);
    case ceilType.END_POSITION:
      return renderEnd(index, state);
    case ceilType.EMPTY:
      return renderCeil(event, state).renderForMove();
  }
}

export function renderCanvas(canvas, context) {
  const localSize = getLocalSize(pageWidth, pageHeight);
  const globalSize = getGlobalSize(localSize.w, localSize.h);
  const gridData = buildGrid(context);

  configureCanvas(canvas, globalSize);

  canvasControl.registerClickEventToCanvas(canvas);
  canvasControl.addMouseMoveEvent((e, s) => {
    return renderLogic(e, s);
  });
  canvasControl.addMouseUpEvent(() => (type = null));
  canvasControl.addMouseClickEvent((e, s) => renderCeil(e, s).renderForClick());

  function render(state) {
    clearCanvas(context, canvas);
    canvasControl.setState(state);

    renderActionsCeil(state.startEndPosition, context);
    renderBarrier(state.barrier, context);

    gridData.applyStyles();
    context.stroke(gridData.grid);
  }

  $state.watch(([graph, path]) => {
    render(graph);
    renderPath({
      path,
      context,
    });
  });
}

let prev = null;
export function renderPath({ context, path = [], color = "blue" }) {
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
