import Vue from 'vue'
import Vuex from 'vuex'
// import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui';
import echarts from 'echarts'
import ECharts from 'vue-echarts'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.scss'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDesktop, faSquare, faServer, faAlignCenter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
// import './permission'

library.add(faDesktop,faSquare,faServer,faAlignCenter)

Vue.prototype.$http = axios;
// const token = localStorage.getItem('token')
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }

Vue.config.productionTip = false;
Vue.use(Vuex)

Vue.use(ElementUI);
Vue.use(echarts);

Vue.component('v-chart', ECharts)
Vue.component('font-awesome-icon', FontAwesomeIcon)

router.beforeEach((to, from, next) => {

  let getFlag = localStorage.getItem("token");
  // 抓要前往的路由權限
  const permissionRoles = to.meta.role
  // 抓當前權限
  const current_role = store.getters.roles
  const hasPermission = current_role.some(role => {
      return permissionRoles.includes(role)
    })
  /* eslint-disable */
  console.log('to:',to.path)
  console.log('from:',from.path)
  if (getFlag == 'ImLogin') {
    if (to.path == '/error/404') {
      next()
    }
    else {
      if(hasPermission) {
        next()
      }
      else {
        ElementUI.Message.error({
          message: '權限不符！',
          center: true,
          duration: 2000
        });
        next('/error/404')
      }
    }
  }
  else {
    next('/login')
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
