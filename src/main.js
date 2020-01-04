import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import echarts from 'echarts'
import ECharts from 'vue-echarts'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
// import store from './store.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDesktop, faSquare, faServer, faAlignCenter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import Login from './components/Login'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import DefectRate from './components/defectRate'
import MachineBoard from './components/MachineBoard'
import WorkOrderBoard from './components/WorkOrderBoard'
import PlanBoard from './components/PlanBoard'
import MoldMaintain from './components/MoldMaintain'
import MachineMaintain from './components/MachineMaintain'
import PartNoMaintain from './components/PartNoMaintain'

library.add(faDesktop,faSquare,faServer,faAlignCenter)

Vue.prototype.$http = axios;
// const token = localStorage.getItem('token')
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }

Vue.config.productionTip = false;
Vue.use(Vuex)
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(echarts);

Vue.component('v-chart', ECharts)
Vue.component('font-awesome-icon', FontAwesomeIcon)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/overview', component: Layout,
    redirect: '/overview/dashboard',
    children: [
      { path: '/overview/dashboard', component: Dashboard },
      { path: '/overview/dashboard/defectrate', component: DefectRate },
      { path: '/overview/work_order', component: WorkOrderBoard },
      { path: '/overview/machine/:line', component: MachineBoard },
      { path: '/overview/plan', component: PlanBoard },
    ],
  },
  { path: '/maintain', component: Layout,
    children: [
      { path: '/maintain/mold', component: MoldMaintain },
      { path: '/maintain/machine', component: MachineMaintain },
      { path: '/maintain/partno', component: PartNoMaintain },
    ],
  }
 
]

const router = new VueRouter({
  mode: 'history',
  routes: routes,
  base: '/nwe',
})

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
