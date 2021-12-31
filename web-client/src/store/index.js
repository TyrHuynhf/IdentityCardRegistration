import Vue from 'vue'
import Vuex from 'vuex'
import authModule from '@/store/modules/authModule'
import userModule from '@/store/modules/userModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authModule,
    userModule,

  },
})
