const funcs = {
  lt: calculateLeftTop
}

function calculateLeftTop (style, curPosition, proportion, needLockProportion, {
  center,
  curPoint,
  symmetricPoint
}) {

}
export default function calculateComponentPositionAndSize (point, style) {
  funcs[point] && funcs[point](style)
}
