import types from './types'
export default {
  state: {
    isShowMenu: false,
    menuLeft: 0,
    menuTop: 0
  },
  mutations: {
    [types.SHOWCONTEXTMENU] (state, { left, top }) {
      state.isShowMenu = true
      state.menuLeft = left
      state.menuTop = top
    },
    [types.HIDECONTEXTMENU] (state) {
      state.isShowMenu = false
    }
  }
}
