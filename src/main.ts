import Vue from 'vue'
import { CoolSelectPlugin } from 'vue-cool-select'

import 'vue-cool-select/dist/themes/bootstrap.css'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(CoolSelectPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
