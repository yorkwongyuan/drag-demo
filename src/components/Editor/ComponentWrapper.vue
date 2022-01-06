<style scoped lang="scss">
  .component-wrapper{
    .component-wrapper__component{
      position: absolute;
    }
  }
</style>
<template>
  <div class="component-wrapper" @click="handleClick">
    <component :is="config.component" :events="config.events" class="component-wrapper__component" :style="getStyle(config.style)" v-bind="config.propValue" v-events="{item: config, index}"></component>
  </div>
</template>
<script>
import { getStyle } from '@/utils/style.js'
export default {
  name: 'component-wrapper',
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: () => 0
    }
  },
  methods: {
    getStyle,
    handleClick () {
      const events = this.config.events
      Object.keys(events).forEach(key => {
        events[key]()
      })
    }
  }
}
</script>
