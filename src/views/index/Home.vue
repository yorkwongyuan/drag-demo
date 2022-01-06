<template>
  <div class="Home">
    <div class="Home__top-bar">
      <TopBar></TopBar>
    </div>
    <div class="Home__main">
      <div class="Home__main--left">
        <SiderBar></SiderBar>
      </div>
      <div class="center" @mousedown="handleMouseDown" @mouseup="delCurComponent">
        <Editor></Editor>
      </div>
      <div class="Home__main--right">
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="属性" name="attr">
            <AttrList></AttrList>
          </el-tab-pane>
          <el-tab-pane label="事件" name="event">
            <Events></Events>
          </el-tab-pane>
          <el-tab-pane label="属性" name="animation">
            animation
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import SiderBar from '@/components/layout/SiderBar.vue'
import Editor from '@/components/Editor/index.vue'
import TopBar from '@/components/top-bar.vue'
import types from '../../store/types'
import AttrList from '../../components/AttrList'
import Events from '../../components/Events'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      activeTab: 'attr'
    }
  },
  computed: {
    ...mapState(['isClickComponent'])
  },
  components: {
    SiderBar,
    Editor,
    AttrList,
    Events,
    TopBar
  },
  methods: {
    ...mapMutations([types.SETCOMPONENTDATA, types.SETCANVASSTYLEDATA]),
    handleMouseDown () {
      this.$store.commit(types.SETCLICKCOMPONENTSTATUS, false)
    },
    delCurComponent (e) {
      if (!this.isClickComponent) {
        this.$store.commit(types.SETCURCOMPONENT, { element: null, index: null })
      }

      if (e.button !== 2) {
        this.$store.commit(types.HIDECONTEXTMENU)
      }
    },
    getStorage () {
      if (localStorage.getItem('canvasData')) {
        this[types.SETCOMPONENTDATA](JSON.parse(localStorage.getItem('canvasData')))
      }
      if (localStorage.getItem('canvasStyle')) {
        this[types.SETCANVASSTYLEDATA](JSON.parse(localStorage.getItem('canvasStyle')))
      }
    }
  },
  created () {
    this.getStorage()
  }
}
</script>
<style lang="scss">
html,body {
  height: 100%;
  margin: 0;
}
.Home{
  display: flex;
  flex-direction: column;
  height: 100%;
  .Home__main {
    display: flex;
    flex: 1;
    overflow: hidden;
    .Home__main--left{
      width: 200px;
      overflow-y: auto;
    }
    .Home__main--right{
      width: 300px;
      overflow-y: auto;
      text-align: center;
    }
    .center{
      flex:1;
      background-color: #f5f5f5;
      padding: 20px;
      overflow: auto;
    }
  }
}
</style>
