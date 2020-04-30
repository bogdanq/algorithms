import { getTargetIndex } from "./config";
import { $gameState, gameStatus, checkGameStatus } from "./game";

class Controll {
  constructor() {
    this.isMouseDown = false;
    this.isMouseMove = false;
    this.listeners = [];
    this.state = {};
    this.lastIndex = null;
    this.disabledListeners = [];
  }

  init() {
    $gameState.watch((state) => {
      if (
        checkGameStatus(
          state,
          gameStatus.START,
          gameStatus.PAUSE,
          gameStatus.RESUME
        )
      ) {
        this.disabledListener();
      } else {
        this.includeListener();
      }
    });

    return this;
  }

  registerClickEventToCanvas(canvas) {
    canvas.addEventListener("mousedown", (event) => {
      this.listeners
        .filter((userEvent) => userEvent.type === "mousedown")
        .forEach((userEvent) => userEvent.eventListener());

      this.isMouseDown = true;
      this.isMouseMove = false;
    });

    canvas.addEventListener("mouseup", (event) => {
      this.isMouseDown = false;
      this.listeners
        .filter((userEvent) => userEvent.type === "mouseup")
        .forEach((userEvent) => userEvent.eventListener(event, this.state));
    });

    canvas.addEventListener("click", (event) => {
      this.listeners
        .filter((userEvent) => userEvent.type === "click")
        .forEach((userEvent) => {
          if (!this.isMouseMove) {
            userEvent.eventListener(event, this.state);
          }
        });
    });

    canvas.addEventListener("mousemove", (event) => {
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

  addMouseDownEvent(eventListener) {
    this.listeners.push({ type: "mousedown", eventListener });
  }

  addMouseUpEvent(eventListener) {
    this.listeners.push({ type: "mouseup", eventListener });
  }

  addMouseMoveEvent(eventListener) {
    this.listeners.push({ type: "mousemove", eventListener });
  }

  addMouseClickEvent(eventListener) {
    this.listeners.push({ type: "click", eventListener });
  }

  setState(state) {
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
canvasControl.init();
