import { sample, merge, combine } from "effector";
import { pageHeight, pageWidth, getLocalSize, getGlobalSize } from "./config";
import { configureCanvas } from "./config-canvas";
import { canvasControl } from "./control-canvas";
import { $graph, resetStore, clearCanvas, $barrierType } from "./graph";
import { executeLogic } from "./render/render";
import { $path, createTick } from "./game";
import { $visitedVertex, $processedVertex } from "./algoritms";
import { buildGrid } from "./render/build-grid";
import { drowBarriers } from "./render/render-barrier-with-type";
import { renderCeil } from "./render/render-ceil";

const $state = combine({
  visitedVertex: $visitedVertex,
  graph: $graph,
  processedVertex: $processedVertex,
  barrierType: $barrierType,
});

export function renderCanvas(canvas, context) {
  const localSize = getLocalSize(pageWidth, pageHeight);
  const globalSize = getGlobalSize(localSize.w, localSize.h);
  const gridData = buildGrid(context);

  addEventsToCanvas(canvas);
  configureCanvas(canvas, globalSize);

  const render = executeLogic(canvas, context, gridData);

  $state.watch(render);

  sample({
    source: $state,
    clock: merge([resetStore, clearCanvas]),
  }).watch(render);

  createTick($path, context);
}

function addEventsToCanvas() {
  canvasControl.registerClickEventToCanvas(canvas);
  canvasControl.addMouseMoveEvent(drowBarriers.renderWithMove);
  canvasControl.addMouseClickEvent((e, s) => renderCeil(e, s).renderForClick());
  canvasControl.addMouseUpEvent(drowBarriers.clear);
}

const canvas = document.getElementById("viewport");

if (canvas) {
  const context = canvas.getContext("2d");

  renderCanvas(canvas, context);
}
