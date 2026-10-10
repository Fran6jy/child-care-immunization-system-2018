import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    isAdminLoggedIn: false,
    adminDetails: {}
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isAdminLoggedIn = true
      } else {
        state.isAdminLoggedIn = false
        state.adminDetails = {}
      }
    },
    setAdmin (state, adminDetails) {
      state.adminDetails = adminDetails
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setAdmin ({commit}, adminDetails) {
      commit('setAdmin', adminDetails)
    }
  }
})
