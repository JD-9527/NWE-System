import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import ElementUI from 'element-ui';
import echarts from 'echarts'
import ECharts from 'vue-echarts'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.scss'
import XLSX from 'xlsx'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDesktop, faSquare, faServer, faAlignCenter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
// import './permission'

library.add(faDesktop,faSquare,faServer,faAlignCenter)

Vue.prototype.$http = axios;
Vue.prototype.$xlsx = XLSX;

Vue.config.productionTip = false;
Vue.use(Vuex)

Vue.use(ElementUI);
Vue.use(echarts);

Vue.component('v-chart', ECharts)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// 不用權限的白名單
let whitelist = ['/login']
router.beforeEach((to, from, next) => {
  /* eslint-disable */
  // 檢查cookie是否有登入的角色資訊
  let hasToken = store.getters.token? store.getters.token: false;
  // console.log(hasToken)
  // 沒有在白名單內的要做權限判斷
  if (whitelist.indexOf(to.path) == -1) {
    // 抓要前往的路由權限
    const permissionRoles = to.meta.role
    // 抓當前權限(先從 cookie 抓取登入的角色權限，)
    let current_role = store.getters.roles;
    let hasPermission = current_role.some(role => {
      return permissionRoles.includes(role)
    })
    if (hasToken) {
      // if (current_role.length == 0) {
      //   // vuex 存入角色資訊
      //   store.dispatch('user/setRoles', [hasToken])
      //   current_role = store.getters.roles
      //   // 重新抓取權限
      //   hasPermission = current_role.some(role => {
      //     return permissionRoles.includes(role)
      //   })
      // }
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
    else next('/login')
  }
  else next()
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
