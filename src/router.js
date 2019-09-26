import Vue from 'vue'
import Router from 'vue-router'

import { readAgreeFlag } from '@/utils/index'
import Home from './views/Home.vue'
import Disclaimer from './views/Disclaimer'
import Bet from './views/Bet'
import Ranking from './views/Ranking'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (readAgreeFlag()) {
          next()
        } else {
          next('/disclaimer')
        }
      }
    },
    {
      path: '/bet',
      name: 'bet',
      component: Bet
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: Disclaimer
    }
  ]
})
