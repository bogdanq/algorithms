import { CombidenGraphType } from "graph";
import { getTargetIndex } from "./config";
import { $gameState, GameStatus, checkGameStatus } from "./game";

type EventListener = (
  event?: MouseEvent,
  state?: { [key: string]: any },
  lastIndex?: number | null
) => void;

type Listener = {
  type: string;
  eventListener: EventListener;
};

class Controll {
  private isMouseDown: boolean = false;
  private isMouseMove: boolean = false;
  private listeners: Array<Listener> = [];
  private state: { graph: CombidenGraphType } | {} = {};
  private lastIndex: null | number = null;
  private disabledListeners: Array<Listener> = [];

  init() {
    $gameState.watch((state) => {
      if (
        checkGameStatus(state, [
          GameStatus.START,
          GameStatus.PAUSE,
          GameStatus.RESUME,
        ])
      ) {
        this.disabledListener();
      } else {
        this.includeListener();
      }
    });

    return this;
  }

  registerClickEventToCanvas(canvas: HTMLCanvasElement) {
    canvas.addEventListener("mousedown", (event: MouseEvent) => {
      this.listeners
        .filter((userEvent) => userEvent.type === "mousedown")
        .forEach((userEvent) => userEvent.eventListener());

      this.isMouseDown = true;
      this.isMouseMove = false;
    });

    canvas.addEventListener("mouseup", (event: MouseEvent) => {
      this.isMouseDown = false;
      this.listeners
        .filter((userEvent) => userEvent.type === "mouseup")
        .forEach((userEvent) => userEvent.eventListener(event, this.state));
    });

    canvas.addEventListener("click", (event: MouseEvent) => {
      this.listeners
        .filter((userEvent) => userEvent.type === "click")
        .forEach((userEvent) => {
          if (!this.isMouseMove) {
            userEvent.eventListener(event, this.state);
          }
        });
    });

    canvas.addEventListener("mousemove", (event: MouseEvent) => {
      const index = getTargetIndex(event);

      if (this.isMouseDown && index !== this.lastIndex) {
        this.lastIndex = index;
        this.isMouseMove = true;
        this.listeners
          .filter((userEvent) => userEvent.type === "mousemove")
          .forEach((userEvent) =>
            userEvent.eventListener(event, this.state, this.lastIndex)
          );
      }
    });
  }

  disabledListener() {
    this.clear();
  }

  includeListener() {
    this.listeners = this.disabledListeners;
  }

  addMouseDownEvent<T extends EventListener>(eventListener: T) {
    this.listeners.push({ type: "mousedown", eventListener });
  }

  addMouseUpEvent<T extends EventListener>(eventListener: T) {
    this.listeners.push({ type: "mouseup", eventListener });
  }

  addMouseMoveEvent<T extends EventListener>(eventListener: T) {
    this.listeners.push({ type: "mousemove", eventListener });
  }

  addMouseClickEvent<T extends EventListener>(eventListener: T) {
    this.listeners.push({ type: "click", eventListener });
  }

  setState(state: Controll["state"]) {
    this.state = state;

    return this;
  }

  clear() {
    if (this.listeners.length > 0) {
      this.disabledListeners = this.listeners;
      this.isMouseDown = false;
      this.isMouseMove = false;
      this.listeners = [];
      this.lastIndex = null;
    }
  }
}

export const canvasControl = new Controll();
