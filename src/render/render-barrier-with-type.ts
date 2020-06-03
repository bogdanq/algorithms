import { getLocalSize, getIndexByPosition, ceilType } from "../config";
import {
  removeBarrierFromState,
  setBarrierToState,
  setEndToStore,
  setStartToStore,
} from "../graph";

class Barrier {
  constructor() {
    this.ceilType = null;
    this.context = null;
    this.setBarrierToStateWithType = this.setBarrierToStateWithType.bind(this);
    this.clear = this.clear.bind(this);
  }

  setBarrierToStateWithType(event, state) {
    const { w, h } = getLocalSize(event.clientX, event.clientY);
    const index = getIndexByPosition([w, h]);
    const { graph } = state;

    if (!this.ceilType) {
      this.ceilType = graph.graph[index].type;
    }

    switch (this.ceilType) {
      case ceilType.BARIER:
        return removeBarrierFromState(event, state);
      case ceilType.WATER:
        return removeBarrierFromState(event, state);
      case ceilType.SAND:
        return removeBarrierFromState(event, state);
      case ceilType.START_POSITION:
        return setStartToStore(index, state);
      case ceilType.END_POSITION:
        return setEndToStore(index, state);
      case ceilType.EMPTY:
        return setBarrierToState(event, state);
    }
  }

  drowBarriersWithType(barriers, context) {
    for (let i = 0; i < barriers.length; i++) {
      if (barriers[i].barrierType === ceilType.WATER) {
        barriers[i].render(context, "#86c7e6");
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

export const barrier = new Barrier();
