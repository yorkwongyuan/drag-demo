<style lang="scss">
.AttrList{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 0 16px;
  .el-form-item{
    margin-bottom: 5px;
  }
}
</style>
<template>
  <el-form class="AttrList" label-width="90px" v-if="curComponent">
    <el-form-item :label="key" v-for="(value, key) in curComponent.propValue" :key="key">
      <!-- 字符串 -->
      <el-input v-model="curComponent.propValue[key]" v-if="typeof value === 'string'"></el-input>
      <el-select v-else-if="typeof value === 'boolean'" v-model="curComponent.propValue[key]">
        <el-option label="true" :value="true"></el-option>
        <el-option label="false" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-for="(key, index) in styleKeys" :key="index" :label="map[key]">
      <template>
        <!-- 颜色类 -->
        <el-color-picker v-model="curComponent.style[key]" v-if="['color', 'borderColor', 'backgroundColor'].includes(key)"></el-color-picker>
        <!-- px类 -->
        <el-input v-if="['fontSize', 'borderWidth', 'width', 'height', 'left', 'top'].includes(key)" v-model="curComponent.style[key]"></el-input>
        <!-- 选择类 -->
        <el-select v-model="curComponent.style[key]" v-if="['borderStyle'].includes(key)">
          <el-option v-for="(item, index) in options[key]" :key="index + key" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </template>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      options: {
        borderStyle: [
          { label: '实线', value: 'solid' },
          { label: '虚线', value: 'dashed' },
          { label: '点线', value: 'dotted' }
        ]
      },
      map: {
        width: '宽度',
        height: '高度',
        top: '顶部距离',
        left: '左侧距离',
        borderColor: '边框色',
        borderWidth: '边框宽度',
        borderStyle: '边框类型',
        fontSize: '字体大小',
        fontWeight: '字体粗细',
        lineHeight: '字体粗细',
        letterSpacing: '字体粗细',
        textAlign: '字体粗细',
        color: '字体颜色',
        backgroundColor: '背景色',
        rotate: '旋转角度'
      }
    }
  },
  computed: {
    styleKeys () {
      const curComponent = this.$store.state.curComponent
      console.log('styleKeys -> curComponent', curComponent && Object.keys(curComponent.style))
      return curComponent && Object.keys(curComponent.style)
    },
    curComponent () {
      return this.$store.state.curComponent
    }
  }
}
</script>
