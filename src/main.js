import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mwpUi from 'mwp-ui'
import Button from '@/components/custom-components/Button'
import Panel from '@/components/custom-components/Panel'
import 'mwp-ui/lib/styles/mwp-ui.css'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont/iconfont.css'
Vue.config.productionTip = false

Vue.component('v-button', Button)
Vue.component('v-panel', Panel)
Vue.directive('events', function (el, binding, vnode) {
  const { item, index } = binding.value || {}
  console.log('item, index', item, index)
  const events = item && item.events
  for (const i in events) {
    if (Object.prototype.hasOwnProperty.call(events, i)) {
      if (!vnode.componentInstance.isLoad) {
        const v = events[i]
        const k = i.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
        const callback = value => {
          v.bind(vnode.context, index, item, value)()
        }
        vnode.componentInstance.$off(k, callback)
        vnode.componentInstance.$on(k, callback)
        vnode.componentInstance.isLoad = true
      }
    }
  }
})
Vue.use(mwpUi)
Vue.use(element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
