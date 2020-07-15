import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user.js'
import permission from './module/permission.js'
// import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: user,
    permission: permission
  },
  getters: {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
  }
})

export default store