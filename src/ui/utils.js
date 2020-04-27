export function checkGameStatus(target, ...status) {
  return status.some((item) => target === item);
}
