import { getLocalSize, getIndexByPosition, BarrierType } from "../config";
import {
  removeBarrierFromState,
  setBarrierToState,
  setEndToStore,
  setStartToStore,
} from "../graph";

class Barrier {
  constructor() {
    this.BarrierType = null;
    this.context = null;
    this.setBarrierToStateWithType = this.setBarrierToStateWithType.bind(this);
    this.clear = this.clear.bind(this);
  }

  setBarrierToStateWithType(event, state) {
    const { w, h } = getLocalSize(event.clientX, event.clientY);
    const index = getIndexByPosition([w, h]);
    const { graph } = state;

    if (!this.BarrierType) {
      this.BarrierType = graph.graph[index].type;
    }

    switch (this.BarrierType) {
      case BarrierType.BARIER:
        return removeBarrierFromState(event, state);
      case BarrierType.WATER:
        return removeBarrierFromState(event, state);
      case BarrierType.SAND:
        return removeBarrierFromState(event, state);
      case BarrierType.START_POSITION:
        return setStartToStore(index, state);
      case BarrierType.END_POSITION:
        return setEndToStore(index, state);
      case BarrierType.EMPTY:
        return setBarrierToState(event, state);
    }
  }

  drowBarriersWithType(barriers, context) {
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
    this.BarrierType = null;
  }
}

export const barrier = new Barrier();
