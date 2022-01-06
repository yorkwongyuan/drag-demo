import Vue from 'vue'
import Vuex from 'vuex'
import types from './types'
import contextmenu from './contextmenu'
import layer from './layer'
import snapshot from './snapshot'
import compose from './compose'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...contextmenu.state,
    ...layer.state,
    ...snapshot.state,
    ...compose.state,
    componentData: [],
    curComponent: null,
    curComponentIndex: 0,
    shapeStyle: {},
    isClickComponent: false,
    canvasStyleData: {
      width: 900,
      height: 740,
      scale: 100
    },
    editMode: 'edit'
  },
  mutations: {
    ...snapshot.mutations,
    ...contextmenu.mutations,
    ...layer.mutations,
    ...compose.mutations,
    // 设置是否点击了组件状态
    [types.SETCLICKCOMPONENTSTATUS] (state, status) {
      state.isClickComponent = status
    },
    [types.SETCOMPONENTDATA] (state, componentData) {
      // 此处如不使用state.xx的写法，用解构，则无法实现效果
      state.componentData = componentData
    },
    // 设置当前正在编辑的组件
    [types.SETCURCOMPONENT] (state, { element, index }) {
      console.log('index', index)
      console.log('element', element)
      state.curComponent = element
      state.curComponentIndex = index
    },
    // 设置shape组件样式
    [types.SETSHAPESTYLE] ({ curComponent }, shapeStyle) {
      console.log('shapeStyle', shapeStyle)
      Object.keys(shapeStyle).forEach(key => {
        curComponent.style[key] = shapeStyle[key]
      })
    },
    // 删除shape组件样式
    [types.DELETECOMPONENT] ({ curComponentIndex, componentData }) {
      const emptyArr = [undefined, 'undefined', null, 'null', '', ' ']
      if (!emptyArr.includes(curComponentIndex)) {
        componentData.splice(curComponentIndex, 1)
      }
    },
    // 吸附时候设置当前组件样式
    [types.SETSHAPESINGLESTYLE] ({ curComponent }, { key, value }) {
      curComponent.style[key] = value
    },
    // 设置画布宽高
    [types.SETCANVASSTYLEDATA] (state, data) {
      state.canvasStyleData = data
    },
    // 设置编辑模式(编辑/预览)
    [types.SETEDITMODE] (state, editMode) {
      state.editMode = editMode
    }
  },
  actions: {
  },
  modules: {
  }
})
