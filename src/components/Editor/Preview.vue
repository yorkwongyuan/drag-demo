<style scoped lang="scss">
.bg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999999;
  background-color: rgba(0,0,0, .6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.preview__close-btn{
  position: fixed;
  right: 20px;
  top: 20px;
}
.preview__container {
  overflow: auto;
  width: calc(100% - 44px);
  height: calc(100% - 44px);
}
.preview__canvas {
  position: relative;
  background-color: white;
  margin: auto;
}
</style>
<template>
  <div class="bg" v-show="editMode === 'preview'" @click="handleSetEditMode('edit')">
    <el-button @click="handleSetEditMode('edit')" size="small" class="preview__close-btn">关闭</el-button>
    <div class="preview__container" @click.stop="">
      <div class="preview__canvas" :style="{
        width: canvasStyleData.width + 'px',
        height: canvasStyleData.height + 'px'
      }">
        <ComponentWrapper
          v-for="(item, index) in componentData" :key="index"
          :config="item"
          :index="index"
        >
        </ComponentWrapper>
      </div>
    </div>
  </div>
</template>
<script>
import ComponentWrapper from './ComponentWrapper'
import { mapState, mapMutations } from 'vuex'
import types from '@/store/types.js'
export default {
  name: 'preview',
  computed: mapState(['componentData', 'canvasStyleData', 'editMode']),
  props: {
    isShow: {
      type: Boolean,
      default: () => false
    }
  },
  components: {
    ComponentWrapper
  },
  methods: {
    ...mapMutations([types.SETEDITMODE]),
    handleSetEditMode (editMode) {
      this[types.SETEDITMODE](editMode)
    }
  }
}
</script>
