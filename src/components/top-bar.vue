<style lang="scss">
  .top-bar{
    padding: 16px;
    .el-form-item {
      display: inline-block;
    }
    .el-form {
      display: inline-block;
    }
    .top-bar__row {
      display: flex;
    }
  }
</style>
<template>
  <div class="top-bar">
    <el-button size="small" @click="handleUndo">撤销</el-button>
    <el-button size="small" @click="handleRedo">重做</el-button>
    <el-button size="mini" @click="handlePreview">预览</el-button>
    <el-button size="mini" @click="save">保存</el-button>
    <el-form>
      <el-form-item label="宽度" label-width="60px">
        <el-input type="text" v-model="canvasStyleData.width" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="高度" label-width="60px">
        <el-input type="text" v-model="canvasStyleData.height" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="画布比例" label-width="80px">
        <div class="top-bar__row">
          <el-input type="text" v-model="scale" @input="handleStyleChange" size="mini"></el-input> &nbsp;&nbsp;%
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import types from '@/store/types'
import { deepClone } from '@/utils/utils.js'
import { listenGlobalKeyDown } from '@/utils/shortCutKey.js'
import eventBus from '@/utils/eventBus'
import { mapMutations, mapState } from 'vuex'
export default {
  name: '',
  data () {
    return {
      scale: 100,
      timer: null,
      needToChange: ['width', 'height', 'font-size', 'top', 'left', 'border-width']
    }
  },
  computed: {
    ...mapState(['canvasStyleData', 'componentData'])
  },
  methods: {
    ...mapMutations([types.UNDO, types.REDO, types.SETCOMPONENTDATA, types.SETCANVASSTYLEDATA, types.SETEDITMODE]),
    // 预览
    handlePreview () {
      this[types.SETEDITMODE]('preview')
    },
    handleUndo () {
      this[types.UNDO]()
    },
    handleRedo () {
      this[types.REDO]()
    },
    // 获取当前元素样式属性的值
    getOriginStyle (value) {
      const result = value / (parseInt(this.canvasStyleData.scale) / 100)
      return result
    },
    // 将值转为当前的比例
    format (value) {
      return value * parseInt(this.scale) / 100
    },
    // 设置比例
    handleStyleChange () {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const componentData = deepClone(this.componentData)
        // 获取整数
        this.scale = (~~this.scale) || 1
        // 遍历每个组件
        componentData.forEach(component => {
          // 遍历组件样式的值
          Object.keys(component.style).forEach(key => {
            // 先通过getOriginStyle获取原来组件最初的值
            // 再通过this.format获取现在比例下，应有的尺寸
            if (this.needToChange.includes(key)) {
              component.style[key] = Math.ceil(this.format(this.getOriginStyle(component.style[key])))
            }
          })
        })
        this[types.SETCOMPONENTDATA](componentData)
        this[types.SETCANVASSTYLEDATA]({
          ...this.canvasStyleData,
          scale: this.scale
        })
      }, 1000)
    },
    // 保存数据
    save () {
      this.$message.success('保存成功')
      localStorage.setItem('canvasData', JSON.stringify(this.componentData))
      localStorage.setItem('canvasStyle', JSON.stringify(this.canvasStyleData))
    }
  },
  created () {
    eventBus.$on('save', this.save)
    listenGlobalKeyDown()
    this.scale = this.canvasStyleData.scale
  }
}
</script>
