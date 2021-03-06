import Vue from 'vue'
import VueRouter from 'vue-router'
const index = () => import(/* webpackChunkName: "index" */ '@/views/index/Home.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: index
  }
]

const router = new VueRouter({
  routes
})

export default router
