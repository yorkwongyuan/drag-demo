
import types from '@/store/types.js'
function setData (index, item) {
  const componentData = this.$store.state.componentData
  componentData[index] = item
  this.$store.commit(types.SETCOMPONENTDATA, componentData)
}
const list = [
  {
    component: 'v-button',
    label: '按钮组件', // 左侧组件列表中显示的名字
    propValue: {}, // 组件所使用的值
    icon: 'el-icon-edit', // 左侧组件列表中显示的名字
    animations: [], // 动画列表
    events: {
      click (value) {
        console.log('click -> value', value)
      }
    }, // 事件列表
    style: { // 组件样式
      width: 62,
      height: 45,
      top: 0,
      left: 0,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
      rotate: 0
    }
  },
  {
    component: 'el-select',
    label: '下拉框', // 左侧组件列表中显示的名字
    propValue: {
      value: ''
    }, // 组件所使用的值
    icon: 'el-icon-edit', // 左侧组件列表中显示的名字
    animations: [], // 动画列表
    events: {}, // 事件列表
    style: { // 组件样式
      backgroundColor: '#fff',
      color: '',
      borderColor: '',
      borderWidth: 0,
      borderStyle: '',
      width: 100,
      height: 40,
      top: 0,
      left: 0,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      rotate: 0
    }
  },
  {
    component: 'el-input',
    label: '输入框', // 左侧组件列表中显示的名字
    propValue: {
      size: 'small',
      value: '测试'
    }, // 组件所使用的值
    icon: 'el-icon-edit', // 左侧组件列表中显示的名字
    animations: [], // 动画列表
    events: {
      input (index, item, value) {
        item.propValue.value = value
        setData.call(this, index, item, 'value')
      }
    }, // 事件列表
    style: { // 组件样式
      backgroundColor: '#fff',
      color: '',
      borderColor: '',
      borderWidth: 0,
      borderStyle: '',
      width: 100,
      height: 32,
      top: 0,
      left: 0,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      rotate: 0
    }
  },
  {
    component: 'el-switch',
    label: '开关', // 左侧组件列表中显示的名字
    propValue: {
      size: 'small',
      value: true
    }, // 组件所使用的值
    icon: 'el-icon-edit', // 左侧组件列表中显示的名字
    animations: [], // 动画列表
    events: {
      change (index, item) {
        if (!item) return
        item.propValue.value = !item.propValue.value
        setData.call(this, index, item)
      }
    }, // 事件列表
    style: { // 组件样式
      backgroundColor: '',
      color: '',
      borderColor: '',
      borderWidth: 0,
      borderStyle: '',
      width: 50,
      height: 20,
      top: 0,
      left: 0,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      rotate: 0
    }
  }
]

export default list
