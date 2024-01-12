import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import system from '@/store/modules/system'
import mall from '@/store/modules/mall'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
		system,
		mall
  },
  getters
})

export default store
