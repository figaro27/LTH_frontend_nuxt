import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import SingleVendor from '@/views/SingleVendor.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/vendor/:vendorId',
    name: 'SingleVendor',
    component: SingleVendor
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
