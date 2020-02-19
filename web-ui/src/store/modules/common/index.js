import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  baseUrl: ''
}
export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
