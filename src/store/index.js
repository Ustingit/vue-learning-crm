import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth'
import info from './info'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      var response = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)

      return await response.json()
    }
  }
});
