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
  clearCanvas,
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
  resetPath,
} from "./model";

import { $path, $isValidGameState } from "./ui/model";
import { $algoritState } from "./algoritms/model";

const $state = combine($isValidGameState, $graph);

function renderBarrier(barrier, context, color = colorSchema.blockColor) {
  for (let i = 0; i < barrier.length; i++) {
    const [x, y] = getPositionByIndex(barrier[i]);
    drawSquare({
      position: [x, y],
      context,
      color,
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

  $graph.watch(render);

  sample({
    source: $graph,
    clock: merge([resetStore, resetPath]),
  }).watch(render);

  function loop(state, numberOfPasses, count) {
    if (count < numberOfPasses) {
      renderBarrier(state[count], context, "#ffff0061");
      const animateId = requestAnimationFrame(() =>
        loop(state, numberOfPasses, count)
      );

      resetPath.watch(() => cancelAnimationFrame(animateId));

      count++;
    } else {
      const path = $path.getState();
      renderPath({
        path,
        context,
      });
    }
  }
  function renderLoop(state, numberOfPasses) {
    let count = 0;
    let animateId = null;

    loop(state, numberOfPasses, count, animateId);
  }

  $algoritState.watch(
    ({ isValidEndProcess, traversedVertices, numberOfPasses }) => {
      if (isValidEndProcess) {
        renderLoop(traversedVertices, numberOfPasses);
      }
    }
  );
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
