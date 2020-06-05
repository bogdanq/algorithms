import { getLocalSize, getIndexByPosition, BarrierType } from "../config";
import {
  removeBarrierFromState,
  setBarrierToState,
  setEndToStore,
  setStartToStore,
  BarrierItem,
  CombidenGraphType,
} from "../graph";

class Barrier {
  private barrierType: null | string;
  protected context: null | CanvasRenderingContext2D;

  constructor() {
    this.barrierType = null;
    this.context = null;
    this.setBarrierToStateWithType = this.setBarrierToStateWithType.bind(this);
    this.clear = this.clear.bind(this);
  }

  setBarrierToStateWithType(
    event: MouseEvent,
    state: { graph: CombidenGraphType }
  ) {
    const { w, h } = getLocalSize(event.clientX, event.clientY);
    const index = getIndexByPosition([w, h]);
    const { graph } = state;

    if (!this.barrierType) {
      this.barrierType = graph.graph[index].type;
    }

    switch (this.barrierType) {
      case BarrierType.BARIER:
        return removeBarrierFromState(event);
      case BarrierType.WATER:
        return removeBarrierFromState(event);
      case BarrierType.SAND:
        return removeBarrierFromState(event);
      case BarrierType.START_POSITION:
        return setStartToStore(index, state);
      case BarrierType.END_POSITION:
        return setEndToStore(index, state);
      case BarrierType.EMPTY:
        return setBarrierToState(event, state);
    }
  }

  drowBarriersWithType(
    barriers: Array<BarrierItem>,
    context: CanvasRenderingContext2D
  ) {
    for (let i = 0; i < barriers.length; i++) {
      if (barriers[i].barrierType === BarrierType.WATER) {
        barriers[i].render(context, "#86c7e6");
      }
      if (barriers[i].barrierType === BarrierType.SAND) {
        barriers[i].render(context, "#fae8c2");
      }
      if (barriers[i].barrierType === BarrierType.BARIER) {
        barriers[i].render(context);
      }
    }
  }

  clear() {
    this.barrierType = null;
  }
}

export const barrier = new Barrier();
