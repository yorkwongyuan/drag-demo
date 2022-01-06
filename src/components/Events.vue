<template>
  <div>
    <div v-for="(item, key, index) in curComponent && curComponent.events" :key="index">
      <!-- <textarea @input="handleInput(index, key, $event.target.value)" :value="item" /> -->
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Events',
  computed: mapState(['curComponent']),
  methods: {
    handleInput (index, key, value) {
      this.curComponent.events[key] = (result) => {}
      console.log('handleInput -> index, value', index, value)
    }
  }
}
</script>
