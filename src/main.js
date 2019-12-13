import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import echarts from 'echarts'
import ECharts from 'vue-echarts'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import MachineBoard from './components/MachineBoard'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDesktop, faSquare, faServer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faDesktop,faSquare,faServer)

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(echarts);

Vue.component('v-chart', ECharts)
Vue.component('font-awesome-icon', FontAwesomeIcon)

const routes = [
	{ path: '/login', component: Login },
	{ path: '/dashboard', component: Dashboard },
	{ path: '/machine', component: MachineBoard }
]

const router = new VueRouter({
	routes
})

new Vue({
	el: '#app',
	router,
  render: h => h(App),
}).$mount('#app')
