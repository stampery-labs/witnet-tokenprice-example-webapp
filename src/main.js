import Vue from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.component('Countdown', VueCountdown)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
