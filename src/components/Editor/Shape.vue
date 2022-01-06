<style lang="scss">
.shape {
  position: absolute;
  .icon-xiangyouxuanzhuan{
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
  }
  .shape-point{
    position: absolute;
    border-radius: 50%;
    border: 1px solid #6c9ae8;
    width: 6px;
    height: 6px;
  }
}
.is-active{
  outline: 1px solid #6c9ae8;
}
</style>
<template>
  <div class="shape" :class="{'is-active': active}" @click="selelctCurrentComponent" @mousedown="handleShapeMouseDown">
    <!-- 旋转操纵杆 -->
    <span class="iconfont icon-xiangyouxuanzhuan" v-show="active" @mousedown="handleRotate"></span>
    <div class="shape-point"
      v-for="(point, index) in (active ? pointList: [])" :key="index"
      :style="getPointStyle(point)"
      @mousedown="handleMouseDownOnPoint(point, $event)"
    >
    </div>
    <slot></slot>
  </div>
</template>
<script>
import types from '@/store/types.js'
import { mod360 } from '@/utils/translate.js'
import { mapMutations, mapState } from 'vuex'
import eventBus from '../../utils/eventBus'
import calculateComponentPositionAndSize from '../../utils/calculateComponentPositonAndSize'
export default {
  name: '',
  data () {
    return {
      pointList: ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb'],
      // 八个方向
      initialAngle: {
        t: 0,
        rt: 45,
        r: 90,
        rb: 135,
        b: 180,
        lb: 235,
        l: 270,
        lt: 315
      },
      angleToCursor: [
        {
          start: 338,
          end: 23,
          cursor: 'n'
        },
        {
          start: 23,
          end: 68,
          cursor: 'ne'
        },
        {
          start: 68,
          end: 113,
          cursor: 'e'
        },
        {
          start: 113,
          end: 158,
          cursor: 'se'
        },
        {
          start: 158,
          end: 203,
          cursor: 's'
        },
        {
          start: 203,
          end: 248,
          cursor: 'sw'
        },
        {
          start: 248,
          end: 293,
          cursor: 'w'
        },
        {
          start: 293,
          end: 338,
          cursor: 'nw'
        }
      ],
      cursors: {}
    }
  },
  computed: {
    ...mapState(['curComponent', 'editor'])
  },
  methods: {
    ...mapMutations([types.SETRECORDSNAPSHOT]),
    handleRotate (e) {
      e.preventDefault()
      e.stopPropagation()
      const pos = this.defaultStyle
      const startX = e.clientX
      const startY = e.clientY
      const startRotate = pos.rotate

      // 获取元素中心点位置
      const rect = this.$el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // 旋转前的角度
      const beforeRotate = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

      // 移动
      const move = (event) => {
        const endX = event.clientX
        const endY = event.clientY
        // 移动旋转之后的角度
        const afterRotate = Math.atan2(endY - centerY, endX - centerX) / (Math.PI / 180)
        // 新的角度
        const rotate = startRotate + (afterRotate - beforeRotate)
        pos.rotate = rotate
        this.$store.commit(types.SETSHAPESTYLE, pos)
      }
      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mouseup', up)
      document.addEventListener('mousemove', move)
    },
    // 拖拽点，控制大小
    handleMouseDownOnPoint (point, event) {
      event.stopPropagation()
      event.preventDefault()
      const style = { ...this.defaultStyle }
      const proportion = style.width / style.height
      // 重新根据源码修改
      const target = event.target

      // 计算中心点
      const center = {
        x: style.left + style.width / 2,
        y: style.top + style.height / 2
      }
      // 获取画布位移信息
      const editorRectInfo = this.editor.getBoundingClientRect()
      const pointRect = target.getBoundingClientRect()

      // 当前点的位置
      const curPoint = {
        x: Math.round(pointRect.left - editorRectInfo.left + target.offsetWidth / 2),
        y: Math.round(pointRect.top - editorRectInfo.top + target.offsetHeight / 2)
      }
      // 对称点
      const symmetricPoint = {
        x: center.x - (curPoint.x - center.x),
        y: center.y - (curPoint.y - center.y)
      }
      const needLockProportion = true
      // 重新根据源码修改
      // this.$store.commit('setClickComponentStatus', true)
      const startX = event.clientX
      const startY = event.clientY
      const pos = this.defaultStyle
      const width = Number(pos.width)
      const height = Number(pos.height)
      const left = Number(pos.left)
      const top = Number(pos.top)
      let isSave = false
      const move = (moveEvent) => {
        // 重新根据源码修改
        const curPosition = {
          x: moveEvent.clientX - editorRectInfo.left,
          y: moveEvent.clientY - editorRectInfo.top
        }

        calculateComponentPositionAndSize(point, style, curPosition, proportion, needLockProportion, {
          center,
          curPoint,
          symmetricPoint
        })

        // 重新根据源码修改

        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        const disX = currX - startX
        const disY = currY - startY
        const hasT = /t/.test(point)
        const hasR = /r/.test(point)
        const hasB = /b/.test(point)
        const hasL = /l/.test(point)
        const newWidth = width + (hasL ? -disX : hasR ? disX : 0)
        const newHeight = height + (hasT ? -disY : hasB ? disY : 0)
        pos.width = newWidth > 0 ? newWidth : 0
        pos.height = newHeight > 0 ? newHeight : 0
        pos.left = left + (hasL ? disX : 0)
        pos.top = top + (hasT ? disY : 0)
        this.$store.commit(types.SETSHAPESTYLE, pos)
        isSave = true
      }
      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        isSave && this[types.SETRECORDSNAPSHOT]()
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    selelctCurrentComponent () {

    },
    // 获取点的样式
    getPointStyle (point) {
      const hasT = /t/.test(point)
      const hasR = /r/.test(point)
      const hasB = /b/.test(point)
      const hasL = /l/.test(point)
      const { width, height } = this.defaultStyle
      let newLeft = 0
      let newTop = 0
      // 四个角
      if (point.length === 2) {
        newLeft = hasL ? 0 : width + 'px'
        newTop = hasT ? 0 : height + 'px'
      } else {
        // 上下
        if (hasT || hasB) {
          newLeft = ((width) / 2) + 'px'
          newTop = hasT ? 0 : height + 'px'
        }
        // 左右
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width + 'px'
          newTop = (height / 2) + 'px'
        }
      }
      return {
        marginLeft: '-4px',
        marginTop: '-4px',
        left: newLeft,
        top: newTop,
        cursor: this.cursors && this.cursors[point]
      }
    },
    // 计算鼠标的样式
    getCursor () {
      const { curComponent, initialAngle, angleToCursor } = this
      const rotate = mod360(curComponent.style.rotate)
      const result = {}
      let lastMatchIndex = -1
      this.pointList.forEach(point => {
        const angle = mod360(initialAngle[point] + rotate)
        const len = angleToCursor.length
        while (true) {
          lastMatchIndex = (lastMatchIndex + 1) % len
          const angleLimit = angleToCursor[lastMatchIndex]
          if (angle < 23 || angle >= 338) {
            result[point] = 'n-resize'
            return
          }

          if (angleLimit.start <= angle && angle < angleLimit.end) {
            result[point] = angleLimit.cursor + '-resize'
            return
          }
        }
      })
      return result
    },
    // 拖拽shape组件
    handleShapeMouseDown (e) {
      e.stopPropagation()
      // 设置点击组件状态为: true，即点击了组件
      this.$store.commit(types.SETCLICKCOMPONENTSTATUS, true)
      this.$store.commit(types.SETCURCOMPONENT, { element: this.element, index: this.zIndex })
      const pos = { ...this.defaultStyle }
      this.cursors = this.getCursor()
      const startLeft = pos.left * 1
      const startTop = pos.top * 1
      const startX = e.clientX
      const startY = e.clientY
      let isSave = false
      const move = (moveEvent) => {
        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        const disX = currX - startX
        const disY = currY - startY
        pos.left = startLeft + disX
        pos.top = startTop + disY
        this.$store.commit(types.SETSHAPESTYLE, pos)
        isSave = true
        // 后两个参数，是否向下，是否向右
        eventBus.$emit('move', disY > 0, disX > 0)
      }
      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        isSave && this[types.SETRECORDSNAPSHOT]()
        // 后两个参数，是否向下，是否向右
        eventBus.$emit('unmove')
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }
  },
  props: {
    active: {
      type: Boolean,
      default: () => false
    },
    element: {
      default: () => {}
    },
    zIndex: {
      type: Number,
      default: () => 0
    },
    defaultStyle: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
