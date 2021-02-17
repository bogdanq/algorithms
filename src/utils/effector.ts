import { createEvent, Store } from "effector";

export function toFields<S>(shape: { [key: string]: Store<S> }) {
  const trigger = createEvent();

  for (const field in shape) {
    // @ts-ignore
    shape[field].on(trigger, (_, val) => val[field]);
  }

  return trigger;
}
