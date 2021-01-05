import Vue from 'vue'
import { routerHistory, writeHistory } from 'vue-router-back-button'
Vue.use(routerHistory)

export default ({ app }) => {
  app.router.afterEach(writeHistory)
}
