<template>
  <div :class="rootClass" @drop="handleDrop"
  id="editor" @dragover="handleDragOver" @contextmenu="handleContextMenu"
  :style="{
    width: changeStyleData(canvasStyleData.width) + 'px',
    height: changeStyleData(canvasStyleData.height) + 'px'
  }"
  >
    <Shape
      v-for="(item, index) in componentData"
      :key="index"
      :defaultStyle="item.style"
      :style="getShapeStyle(item.style, index)"
      :element="item"
      :zIndex="index"
      :active="curComponent === item"
      >
      <component class="component" v-bind="item.propValue" v-events="{item, index}" :is="item.component" :style="getComponentStyle(item.style)"></component>
    </Shape>
    <MarkerLine />
    <ContextMenu />
    <Preview />
  </div>
</template>
<script>
import componentList from '@/components/custom-components/components.js'
import types from '@/store/types.js'
import { deepClone } from '../../utils/utils'
import { getStyle } from '../../utils/style'
import { changeStyleData } from '../../utils/translate'
import Shape from './Shape.vue'
import ContextMenu from './ContextMenu'
import Preview from './Preview'
import { mapState, mapMutations } from 'vuex'
import MarkerLine from './MarkerLine'
export default {
  name: 'main-edit',
  data () {
    return {
      rootClass: 'main-edit'
    }
  },
  computed: {
    ...mapState(['componentData', 'curComponent', 'canvasStyleData'])
  },
  components: { Shape, ContextMenu, MarkerLine, Preview },
  methods: {
    changeStyleData,
    ...mapMutations([types.SETRECORDSNAPSHOT, types.GETEDITOR]),
    handleDrop (e) {
      const index = e.dataTransfer.getData('index')
      const component = componentList[index]
      let target = e.target
      let left = e.offsetX
      let top = e.offsetY
      while (!target.className.includes(this.rootClass)) {
        left += target.offsetLeft
        top += target.offsetTop
        target = target.parentNode
      }
      component.style.left = left - component.style.width / 2
      component.style.top = top - component.style.height / 2
      const clonedComponent = deepClone(component)
      this.$store.commit(types.SETCOMPONENTDATA, [...this.componentData, ...[clonedComponent]])
      this[types.SETRECORDSNAPSHOT]()
    },
    // 右击菜单
    handleContextMenu (e) {
      e.stopPropagation()
      e.preventDefault()
      let target = e.target
      let left = e.offsetX
      let top = e.offsetY
      // 循环一直找到当前点击点相对于画布的位置
      // 层层累加offest距离
      while (!target.className.includes(this.rootClass)) {
        left += target.offsetLeft // 注意事件对象是offsetX/y,而元素对象是offsetLeft/Top
        top += target.offsetTop
        target = target.parentNode
      }
      this.$store.commit(types.SHOWCONTEXTMENU, { left, top })
    },
    handleDragOver (e) {
      e.preventDefault()
      e.stopPropagation()
    },
    getComponentStyle (style) {
      // 过滤掉宽高等样式
      const result = getStyle(style, ['width', 'height', 'left', 'top', 'rotate'])
      return result
    },
    // 将纯数字转为带有单位的样式数据
    getShapeStyle (styleObj, index) {
      const result = {
        zIndex: index
      }
      const arr = ['width', 'height', 'left', 'top', 'rotate', 'z-index', 'color', 'backgroundColor', 'borderColor']
      arr.forEach(attr => {
        if (attr !== 'rotate') {
          result[attr] = styleObj[attr] + 'px'
        } else {
          result.transform = `rotate(${styleObj[attr]}deg)`
        }
      })
      console.log('getShapeStyle -> result', result)
      return result
    },
    setIsShow (bool) {
      this[types.SETEDITMODE](bool)
    }
  },
  mounted () {
    this[types.GETEDITOR]()
  }
}
</script>
<style lang="scss">
.main-edit {
  background-color: white;
  position: relative;
  height: 100%;
  border: 1px solid #555;
  margin: auto;
  overflow: auto;
  .component{
    width: 100%;
    height: 100%;
    outline: none;
  }
}
</style>
