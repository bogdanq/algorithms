import { CombidenGraphType } from "graph";
import { ProcessedVertex } from "algoritms";
import { clearALlCanvas } from "../config";
import { canvasControl } from "../control-canvas";
import { animatedVisitedVertex } from "../game/animated-vertex";
import { barrier } from "./render-barrier-with-type";
import { drowStartEndPositions } from "./drow-start-end-position";
import { Grid } from "./build-grid";

type Render = {
  visitedVertex: number[];
  graph: CombidenGraphType;
  processedVertex: ProcessedVertex;
};

export function executeLogic(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  gridData: Grid
) {
  return function render({ graph, visitedVertex, processedVertex }: Render) {
    clearALlCanvas(context, canvas);

    canvasControl.setState({ graph });

    animatedVisitedVertex.drawVertexWithLoop(processedVertex);

    animatedVisitedVertex.drawVisitedVertexWithLoop(visitedVertex);

    barrier.drowBarriersWithType(graph.barrier, context);

    drowStartEndPositions(graph.startEndPosition, context);

    gridData.applyStyles();
    context.stroke(gridData.grid);
  };
}
