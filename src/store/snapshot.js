import types from './types'
import { deepClone } from '../utils/utils'

export default {
  state: {
    recordShotData: [],
    recordShotIndex: -1
  },
  mutations: {
    [types.SETRECORDSNAPSHOT] (state) {
      state.recordShotData[++state.recordShotIndex] = deepClone(state.componentData)
      // undo过程中又新增了记录，则删除掉后面的
      if (state.recordShotIndex < state.recordShotData.length - 1) {
        state.recordShotData = state.recordShotData.slice(0, state.recordShotIndex)
      }
    },
    // 撤销
    [types.UNDO] (state) {
      if (state.recordShotIndex > 0) {
        state.recordShotIndex--
        state.componentData = deepClone(state.recordShotData[state.recordShotIndex])
        console.log('state.componentData', state.componentData)
      }
    },
    // 重做
    [types.REDO] (state) {
      console.log(state.recordShotIndex, 'state.recordShotIndex')
      console.log(state.componentData.length, 'state.componentData.length')
      if (state.recordShotIndex < state.recordShotData.length - 1) {
        state.recordShotIndex++
        state.componentData = deepClone(state.recordShotData[state.recordShotIndex])
        console.log('state.componentData', state.componentData)
      }
    }
  }
}
