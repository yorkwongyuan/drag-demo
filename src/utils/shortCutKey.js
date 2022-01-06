import store from '@/store/index.js'
import eventBus from './eventBus'
const ctrlKey = 91
// s按键
const sKey = 83
const event = new Map()
event.set(sKey, (e) => {
  window.event.preventDefault()
  eventBus.$emit('save')
})
// 是否按下了ctrl按键
let isCtrlDown = false
// 监听全局键盘事件
export function listenGlobalKeyDown () {
  window.onkeydown = (e) => {
    console.log(store.state.curComponent)
    // 按下了ctrl按键
    if (ctrlKey === e.keyCode) {
      isCtrlDown = true
    }
    // 按下ctrl按键
    if (isCtrlDown && e.keyCode !== ctrlKey) {
      event.get(e.keyCode) && event.get(e.keyCode)()
      console.log('window.onkeydown -> e.keyCode', e.keyCode)
    }
  }
  window.onkeyup = (e) => {
    isCtrlDown = false
  }
}
