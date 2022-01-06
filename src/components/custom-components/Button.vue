<template>
  <mwp-button v-bind="propValue">按钮</mwp-button>
</template>
<script>
export default {
  props: {
    propValue: {
      type: Object,
      default: () => ({
        size: 'large',
        type: 'sub'
      })
    },
    events: {
      type: Object,
      default: () => ({
        click: (value) => {
          console.log('value', value)
        }
      })
    }
  }
}
</script>
