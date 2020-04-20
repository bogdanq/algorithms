class Controll {
  constructor() {
    this.isMouseDown = false;
    this.isMouseMove = false;
    this.listeners = [];
  }

  registerClickEventToCanvas(canvas) {
    canvas.addEventListener("mousedown", (event) => {
      this.listeners
        .filter((userEvent) => userEvent.type === "mousedown")
        .forEach((userEvent) => userEvent.eventListener());

      this.isMouseDown = true;
      this.isMouseMove = false;
    });

    canvas.addEventListener("mouseup", () => {
      this.isMouseDown = false;
    });

    canvas.addEventListener("click", (event) => {
      this.listeners
        .filter((userEvent) => userEvent.type === "click")
        .forEach((userEvent) => {
          if (!this.isMouseMove) {
            userEvent.eventListener(event);
          }
        });
    });

    canvas.addEventListener("mousemove", (event) => {
      if (this.isMouseDown) {
        this.isMouseMove = true;
        this.listeners
          .filter((userEvent) => userEvent.type === "mousemove")
          .forEach((userEvent) => userEvent.eventListener(event));
      }
    });
  }

  addMouseDownEvent(eventListener) {
    this.listeners.push({ type: "mousedown", eventListener });
  }

  addMouseUpEvent() {
    this.listeners.push({ type: "mouseup" });
  }

  addMouseMoveEvent(eventListener) {
    this.listeners.push({ type: "mousemove", eventListener });
  }

  addMouseClickEvent(eventListener) {
    this.listeners.push({ type: "click", eventListener });
  }
}

export const canvasControl = new Controll();
