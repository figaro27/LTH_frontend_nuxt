import Vue from 'vue'
import Vuex from 'vuex'

import search from './search'
import vendor from './vendor'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    search,
    vendor
  }
})
