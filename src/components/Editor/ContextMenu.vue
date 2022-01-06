<style lang="scss">
  .ContextMenu{
    position: absolute;
    box-sizing: border-box;
    z-index: 99999;
    .ContextMenu__ul{
      .ContextMenu__li{
        &:hover {
          background: #2d35d4;
          color: white;
        }
        padding: 8px 16px;
        background-color: #eee;
        cursor: pointer;
      }
    }
  }
</style>
<template>
  <div class="ContextMenu" v-show="isShowMenu" :style="{left: menuLeft + 'px', top: menuTop + 'px'}">
    <ul class="ContextMenu__ul" @mouseup="handleMouseUp">
      <template v-if="curComponent">
        <li class="ContextMenu__li" v-for="(menu, index) in menus" :key="index" @click.stop="action(menu.fn)">
          {{menu.label}}
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import types from '../../store/types'
export default {
  name: 'ContextMenu',
  data () {
    return {
      menus: [
        {
          label: '置顶',
          fn: 'handleTopComponent'
        },
        {
          label: '置底',
          fn: 'bottomComponent'
        },
        {
          label: '上移',
          fn: 'handleUpComponent'
        },
        {
          label: '下移',
          fn: 'hanldeDownComponent'
        },
        {
          label: '删除',
          fn: 'handleDeleteComponent'
        }
        // {
        //   label: '复制',
        //   fn: 'copy'
        // },
        // {
        //   label: '粘贴',
        //   fn: 'paste'
        // },
        // {
        //   label: '剪切',
        //   fn: 'cut'
        // },
        // {
        //   label: '删除',
        //   fn: 'del'
        // }
      ]
    }
  },
  methods: {
    ...mapMutations([
      types.HIDECONTEXTMENU,
      types.DOWNCOMPONENT,
      types.SETCLICKCOMPONENTSTATUS,
      types.UPCOMPONENT,
      types.DELETECOMPONENT,
      types.TOPCOMPONENT
    ]),
    handleMouseUp () {
      this[types.SETCLICKCOMPONENTSTATUS](true)
    },
    action (fn) {
      this[fn]()
      this[types.HIDECONTEXTMENU]()
    },
    bottomComponent () {
    },
    // 置顶
    handleTopComponent () {
      this[types.TOPCOMPONENT]()
    },
    hanldeDownComponent () {
      this[types.DOWNCOMPONENT]()
    },
    handleUpComponent () {
      this[types.UPCOMPONENT]()
    },
    handleDeleteComponent () {
      this[types.DELETECOMPONENT]()
    }
  },
  computed: {
    ...mapState(['menuLeft', 'menuTop', 'isShowMenu', 'curComponent'])
  }
}
</script>
