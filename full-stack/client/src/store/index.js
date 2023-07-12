import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import theme from './modules/theme'
import permission from './modules/permission'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    theme,
    permission,
    app
  }
})
