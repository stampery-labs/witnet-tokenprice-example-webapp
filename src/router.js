import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'js-cookie'

import Home from './views/Home.vue'
import Disclaimer from './views/Disclaimer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (cookie.get('seen')) {
          next()
        } else {
          next('/disclaimer')
        }
      }
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: Disclaimer
    }
  ]
})
