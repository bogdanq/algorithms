import { getLocalSize, getIndexByPosition, ceilType } from "../config";
import { renderCeil } from "./render-ceil";
import { renderStart, renderEnd } from "./drow-start-end-position";

class RenderBarriers {
  constructor() {
    this.ceilType = null;
    this.context = null;
    this.renderWithMove = this.renderWithMove.bind(this);
    this.clear = this.clear.bind(this);
  }

  renderWithMove(event, state) {
    const { w, h } = getLocalSize(event.clientX, event.clientY);
    const index = getIndexByPosition([w, h]);
    const { graph } = state;
    const { renderForMove, renderForClick } = renderCeil(event, state);

    if (!this.ceilType) {
      this.ceilType = graph.graph[index].type;
    }

    switch (this.ceilType) {
      case ceilType.BARIER:
        return renderForClick();
      case ceilType.WATER:
        return renderForClick();
      case ceilType.SAND:
        return renderForClick();
      case ceilType.START_POSITION:
        return renderStart(index, state);
      case ceilType.END_POSITION:
        return renderEnd(index, state);
      case ceilType.EMPTY:
        return renderForMove();
    }
  }

  drowBarriers(barriers, context) {
    for (let i = 0; i < barriers.length; i++) {
      if (barriers[i].barrierType === ceilType.WATER) {
        barriers[i].render(context, "#73c8ef");
      }
      if (barriers[i].barrierType === ceilType.SAND) {
        barriers[i].render(context, "#fae8c2");
      }
      if (barriers[i].barrierType === ceilType.BARIER) {
        barriers[i].render(context);
      }
    }
  }

  clear() {
    this.ceilType = null;
  }
}

export const drowBarriers = new RenderBarriers();
