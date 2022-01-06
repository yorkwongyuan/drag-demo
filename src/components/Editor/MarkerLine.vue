<template>
<div>
  <div v-for="line in lines" :key="line" v-show="lineStatus[line]" :ref="line" class="line" :class="line.includes('x') ? 'x-line' : 'y-line'">

  </div>
</div>
</template>
<script>
import eventBus from '../../utils/eventBus'
import { mapState, mapMutations } from 'vuex'
import { getComponentRotatedStyle } from '../../utils/style'
import types from '../../store/types'
export default {
  name: 'mark-line',
  data () {
    return {
      lines: ['xt', 'xc', 'xb', 'yl', 'yc', 'yr'],
      diff: 3,
      lineStatus: {
        xt: false,
        xc: false,
        xb: false,
        yl: false,
        yc: false,
        yr: false
      },
      isCalculatting: false
    }
  },
  methods: {
    ...mapMutations([types.SETSHAPESINGLESTYLE, types.SETSHAPESINGLESTYLE]),
    // 隐藏所有辅助线
    hideLine () {
      Object.keys(this.lineStatus).forEach(key => {
        this.lineStatus[key] = false
      })
    },
    isNearly (curValue, targetValue) {
      return Math.abs(curValue - targetValue) <= this.diff
    },
    showLine (isDownWard, isRightWard) {
      const lines = this.$refs
      const components = this.componentData
      const curComponentStyle = getComponentRotatedStyle(this.curComponent.style)
      const curComponentHalfWidth = curComponentStyle.width / 2
      const curComponentHalfHeight = curComponentStyle.height / 2
      this.hideLine()
      // 遍历所有的组件
      components.forEach(component => {
        // 组件不能是当前控制的组件自身
        if (this.curComponent === component) return
        const { top, right, bottom, left } = getComponentRotatedStyle(component.style)
        // 目标组件一半的高度
        const componentHalfHeight = component.style.height / 2
        // 目标组件一半的宽度
        const componentHalfWidth = component.style.width / 2
        // 所有的条件
        const conditions = {
          top: [
            { // 下对上
              isNearly: this.isNearly(curComponentStyle.bottom, top),
              lineNode: lines.xt,
              line: 'xt',
              dragShift: top - curComponentStyle.height, // curComponent的样式
              lineShift: top // line的样式
            }, { // 上对上
              isNearly: this.isNearly(curComponentStyle.top, top),
              lineNode: lines.xt,
              line: 'xt',
              dragShift: top, // curComponent的样式
              lineShift: top // line的样式
            }, { // 下对下
              isNearly: this.isNearly(curComponentStyle.bottom, bottom),
              lineNode: lines.xb,
              line: 'xb',
              dragShift: bottom - curComponentStyle.height, // curComponent的样式
              lineShift: bottom // line的样式
            }, { // 中对中
              isNearly: this.isNearly(curComponentStyle.bottom - curComponentHalfHeight, bottom - componentHalfHeight),
              lineNode: lines.xc,
              line: 'xc',
              dragShift: bottom - componentHalfHeight - curComponentHalfHeight, // curComponent的样式
              lineShift: bottom - componentHalfHeight // line的样式
            }, { // 上对下
              isNearly: this.isNearly(curComponentStyle.top, bottom),
              lineNode: lines.xb,
              line: 'xb',
              dragShift: bottom, // curComponent的样式
              lineShift: bottom // line的样式
            }
          ],
          left: [
            {
              // curComponent 从左侧接近目标组件左侧
              isNearly: this.isNearly(curComponentStyle.right, left),
              lineNode: lines.yl,
              line: 'yl',
              dragShift: left - curComponentStyle.width,
              lineShift: left
            },
            { // curComponent 从右侧接近目标组件左侧
              isNearly: this.isNearly(curComponentStyle.left, left),
              lineNode: lines.yl,
              line: 'yl',
              dragShift: left,
              lineShift: left
            },
            { // curComponent 从左侧接近目标组件右侧
              isNearly: this.isNearly(curComponentStyle.left, right),
              lineNode: lines.yr,
              line: 'yr',
              dragShift: right,
              lineShift: right
            },
            { // curComponent 从右侧接近目标组件右侧
              isNearly: this.isNearly(curComponentStyle.right, right),
              lineNode: lines.yr,
              line: 'yr',
              dragShift: right - curComponentStyle.width,
              lineShift: right
            },
            { // curComponent 中线靠近
              isNearly: this.isNearly(curComponentStyle.right - curComponentHalfWidth, right - componentHalfWidth),
              lineNode: lines.yc,
              line: 'yc',
              dragShift: right - componentHalfWidth - curComponentHalfWidth,
              lineShift: right - componentHalfWidth
            }
          ]
        }
        const needToShow = []
        // key: left/top
        Object.keys(conditions).forEach(key => {
          conditions[key].forEach(condition => {
            if (!condition.isNearly) return
            // 如果组件接近了，那么，要改变curComponent的位置以及计算出辅助线的位置
            const dragShift = condition.dragShift
            // 将当前的组件'瞬间'移动到对应的位置上
            this[types.SETSHAPESINGLESTYLE]({ key, value: dragShift })
            // 将辅助线放置到对应的位置上
            const node = condition.lineNode && condition.lineNode[0]
            node.style[key] = condition.lineShift + 'px'
            needToShow.push(condition.line)
          })
        })
        if (needToShow.length) {
          this.chooseTheTureLine(needToShow, isDownWard, isRightWard)
        }
      })
    },
    // 只显示一根线
    chooseTheTureLine (needToShow, isDownWard, isRightWard) {
      // 如果是向下移动，那么底线具有优先出现权
      if (isDownWard) {
        if (needToShow.includes('xb')) {
          this.lineStatus.xb = true
        } else if (needToShow.includes('xc')) {
          this.lineStatus.xc = true
        } else if (needToShow.includes('xt')) {
          this.lineStatus.xt = true
        }
      // 如果是向上移动，那么顶线具有优先出现权
      } else {
        if (needToShow.includes('xt')) {
          this.lineStatus.xt = true
        } else if (needToShow.includes('xc')) {
          this.lineStatus.xc = true
        } else if (needToShow.includes('xb')) {
          this.lineStatus.xb = true
        }
      }
      // 如果是向右移动，右侧线具有优先出现权
      if (isRightWard) {
        if (needToShow.includes('yr')) {
          this.lineStatus.yr = true
        } else if (needToShow.includes('yc')) {
          this.lineStatus.yc = true
        } else if (needToShow.includes('yl')) {
          this.lineStatus.yl = true
        }
      // 如果是向左移动，左侧线具有优先出现权
      } else {
        if (needToShow.includes('yl')) {
          this.lineStatus.yl = true
        } else if (needToShow.includes('yc')) {
          this.lineStatus.yc = true
        } else if (needToShow.includes('yr')) {
          this.lineStatus.yr = true
        }
      }
    }
  },
  computed: mapState(['curComponent', 'componentData']),
  mounted () {
    eventBus.$on('move', (isDownWard, isRightWard) => {
      if (!this.isCalculatting) {
        this.isCalculatting = true
        setTimeout(() => {
          this.showLine(isDownWard, isRightWard)
          this.isCalculatting = false
        }, 100)
      }
    })
    eventBus.$on('unmove', () => {
      setTimeout(() => {
        this.hideLine()
      }, 400)
    })
  }
}
</script>
<style lang="scss">
.line {
  background-color: #59c7f9;
  position: absolute;
  z-index: 99999;
}
.x-line {
  width: 100%;
  height: 1px;
}
.y-line {
  width: 1px;
  height: 100%;
}
</style>
