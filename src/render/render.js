import { clearALlCanvas } from "../config";
import { canvasControl } from "../control-canvas";
import { animatedVisitedVertex } from "../game/animated-vertex";
import { drowBarriers } from "./render-barrier-with-type";
import { drowStartEndPOsitions } from "./drow-start-end-position";

export function executeLogic(canvas, context, gridData) {
  return function render({
    graph,
    visitedVertex,
    processedVertex,
    barrierType,
  }) {
    clearALlCanvas(context, canvas);

    canvasControl.setState({ graph, barrierType });

    animatedVisitedVertex.drawVertexWithLoop(processedVertex, visitedVertex);

    drowBarriers.drowBarriers(graph.barrier, context);

    drowStartEndPOsitions(graph.startEndPosition, context);

    gridData.applyStyles();
    context.stroke(gridData.grid);
  };
}
