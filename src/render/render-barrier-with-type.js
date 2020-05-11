import { getLocalSize, getIndexByPosition, ceilType } from "../config";
import { renderCeil } from "./render-ceil";
import { renderStart, renderEnd } from "./drow-start-end-position";

class RenderBarriers {
  constructor() {
    this.ceilType = null;
    this.context = null;
    this.waters = [];
    this.barriers = [];
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
        this.ceilType = null;
        return renderForClick();
      case ceilType.WATER:
        this.ceilType = null;
        return renderForClick();
      case ceilType.START_POSITION:
        return renderStart(index, state);
      case ceilType.END_POSITION:
        return renderEnd(index, state);
      case ceilType.EMPTY:
        this.ceilType = null;
        return renderForMove();
    }
  }

  renderBarrier(barriers, context) {
    this.waters = barriers[ceilType.WATER];
    this.barriers = barriers[ceilType.BARIER];
    this.context = context;

    this.drowBarriers();
  }

  drowBarriers() {
    for (let i = 0; i < this.waters.length; i++) {
      this.waters[i].render(this.context, "#73c8ef");
    }

    for (let i = 0; i < this.barriers.length; i++) {
      this.barriers[i].render(this.context);
    }
  }

  clear() {
    this.ceilType = null;
  }
}

export const drowBarriers = new RenderBarriers();
