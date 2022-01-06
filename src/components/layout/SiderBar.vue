<style lang="scss">
.sider-bar{
  padding-left: 16px;
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 8px;
  .sider-bar__item {
    text-align: center;
    line-height: 32px;
    border-radius: 4px;
    border: 1px solid #555;
    display: inlnie-block;
    width: 80px;
    height: 32px;
  }
}
</style>
<template>
  <div class="sider-bar" @dragstart="handleDragStart">
    <div class="sider-bar__item" v-for="(component, index) in componentLists" :key="index" :draggable="true" :data-index="index">
      <div>{{component.label}}</div>
    </div>
  </div>
</template>
<script>
import components from '@/components/custom-components/components.js'
export default {
  name: 'sider-bar',
  data () {
    return {
      componentLists: components
    }
  },
  methods: {
    handleDragStart (e) {
      const index = e.target.dataset.index
      // const component = components[index]
      // console.log(component, 'target')
      e.dataTransfer.setData('index', index)
    }
  },
  mounted () {}
}
</script>
