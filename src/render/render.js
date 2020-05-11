import { clearALlCanvas } from "../config";
import { canvasControl } from "../control-canvas";
import { renderVisitedVertexByArr, renderVisitedVertex } from "../game";
import { drowBarriers } from "./render-barrier-with-type";
import { renderActionsCeil } from "./drow-start-end-position";

export function executeLogic(canvas, context, gridData) {
  return function ({ graph, visitedVertex, processedVertex, barrierType }) {
    clearALlCanvas(context, canvas);
    canvasControl.setState({ graph, barrierType });

    renderVisitedVertexByArr(processedVertex.siblings, context, "#d2ef99");
    renderVisitedVertex(processedVertex.vertex, context, "#f3fc23");
    renderVisitedVertexByArr(visitedVertex, context, "#00bcd4");

    drowBarriers.renderBarrier(graph.barriersList, context);
    renderActionsCeil(graph.startEndPosition, context);

    gridData.applyStyles();
    context.stroke(gridData.grid);
  };
}
