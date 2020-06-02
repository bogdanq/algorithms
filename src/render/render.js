import { clearALlCanvas } from "../config";
import { canvasControl } from "../control-canvas";
import { animatedVisitedVertex } from "../game/animated-vertex";
import { barrier } from "./render-barrier-with-type";
import { drowStartEndPositions } from "./drow-start-end-position";

export function executeLogic(canvas, context, gridData) {
  return function render({
    graph,
    visitedVertex,
    processedVertex,
    barrierType,
  }) {
    clearALlCanvas(context, canvas);

    canvasControl.setState({ graph, barrierType });

    animatedVisitedVertex.drawVertexWithLoop(processedVertex);

    animatedVisitedVertex.drawVisitedVertexWithLoop(visitedVertex);

    barrier.drowBarriersWithType(graph.barrier, context);

    drowStartEndPositions(graph.startEndPosition, context);

    gridData.applyStyles();
    context.stroke(gridData.grid);
  };
}
