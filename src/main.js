import Vue from 'vue'
// import Vuex from 'vuex'
// import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui';
import echarts from 'echarts'
import ECharts from 'vue-echarts'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.scss'
import App from './App.vue'
// import store from './store.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDesktop, faSquare, faServer, faAlignCenter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

library.add(faDesktop,faSquare,faServer,faAlignCenter)

Vue.prototype.$http = axios;
// const token = localStorage.getItem('token')
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }

Vue.config.productionTip = false;
// Vue.use(Vuex)

Vue.use(ElementUI);
Vue.use(echarts);

Vue.component('v-chart', ECharts)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//         next()
//         return
//       }
//       next('/login')
//     }
//     else {
//       next()
//   }
// });

new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App),
}).$mount('#app')
