import { $ } from '../utils/utils'
import types from './types'
export default {
  state: {
    editor: null
  },
  mutations: {
    [types.GETEDITOR] (state) {
      state.editor = $('#editor')
    }
  }
}
