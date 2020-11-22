export function snapToGrid(x: number, y: number): [number, number] {
  const snappedX = Math.round(x / 64) * 64;
  const snappedY = Math.round(y / 64) * 64;
  return [snappedX, snappedY];
}
