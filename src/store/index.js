import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tab: 'home'
  },
  getters: {
    GE_TAB: state => state.tab
  },
  mutations: {
    MU_TAB: (state, payload) => {
      state.tab = payload.tab
    }
  },
  actions: {
    AC_TAB: ({ commit }, payload) => {
      commit('MU_TAB', payload)
    }
  },
  modules: {
  }
})
