import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import { Toast } from 'mint-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.component(Toast.name, Toast);

// const Login = { template: '<div>login</div>'}
const routes = [
	{ path: '/login', component: Login },
	{ path: '/dashboard', component: Dashboard }
]

const router = new VueRouter({
	routes
})

new Vue({
	el: '#app',
	router,
  render: h => h(App),
}).$mount('#app')
