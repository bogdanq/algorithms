import { sample, merge, combine } from "effector";
import { pageHeight, pageWidth, getLocalSize, getGlobalSize } from "./config";
import { configureCanvas } from "./config-canvas";
import { canvasControl } from "./control-canvas";
import {
  $graph,
  resetStore,
  clearCanvas,
  removeBarrierFromState,
} from "./graph";
import { executeLogic } from "./render/render";
import { $path, createTick } from "./game";
import { $visitedVertex, $processedVertex } from "./algoritms";
import { buildGrid } from "./render/build-grid";
import { barrier } from "./render/render-barrier-with-type";

const $state = combine({
  visitedVertex: $visitedVertex,
  graph: $graph,
  processedVertex: $processedVertex,
});

export function renderCanvas(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
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

function addEventsToCanvas(canvas: HTMLCanvasElement) {
  canvasControl.init();
  canvasControl.registerClickEventToCanvas(canvas);
  canvasControl.addMouseMoveEvent(barrier.setBarrierToStateWithType);
  canvasControl.addMouseClickEvent(removeBarrierFromState);
  canvasControl.addMouseUpEvent(barrier.clear);
}
