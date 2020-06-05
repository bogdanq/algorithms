export function configureCanvas(
  canvas: HTMLCanvasElement,
  { w, h }: { w: number; h: number }
) {
  canvas.height = h;
  canvas.width = w;
}
