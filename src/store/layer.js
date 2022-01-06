import types from './types'
import { swap } from '../utils/utils'
export default {
  state: {},
  mutations: {
    // 下移
    [types.DOWNCOMPONENT] ({ componentData, curComponentIndex }) {
      console.log('curComponentIndex', curComponentIndex)
      if (curComponentIndex > 0) {
        swap(componentData, curComponentIndex, curComponentIndex - 1)
      } else {
        console.log('到底了')
      }
    },
    // 上移
    [types.UPCOMPONENT] ({ componentData, curComponentIndex }) {
      console.log('curComponentIndex', curComponentIndex)
      if (curComponentIndex < componentData.length - 1) {
        swap(componentData, curComponentIndex, curComponentIndex + 1)
      } else {
        console.log('到顶了')
      }
    },
    // 置顶
    [types.TOPCOMPONENT] ({ componentData, curComponentIndex }) {
      console.log('componentData', componentData)
      console.log('curComponentIndex', curComponentIndex)
      if (curComponentIndex < componentData.length - 1) {
        console.log('componentData.length - 1', componentData.length - 1)
        swap(componentData, curComponentIndex, componentData.length - 1)
      } else {
        console.log('无法置顶, 已经到顶')
      }
    }
  }
}
