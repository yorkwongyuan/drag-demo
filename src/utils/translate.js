import store from '@/store'
export function mod360 (deg) {
  return (deg + 360) % 360
}
// 改变画布比例
export function changeStyleData (value) {
  return value * parseInt(store.state.canvasStyleData.scale) / 100
}
