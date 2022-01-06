<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
html,body {
  height: 100%;
  margin: 0;
}
.app{
  display: flex;
  flex-direction: column;
  height: 100%;
  .app__top-bar {
    height: 48px;
    line-height: 48px;
  }
  .app__main {
    display: flex;
    flex: 1;
    overflow: hidden;
    .app__main--left{
      width: 200px;
      overflow-y: auto;
    }
    .app__main--right{
      flex:1;
    }
  }
}
</style>
