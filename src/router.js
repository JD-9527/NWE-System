import Vue from 'vue'
import VueRouter from 'vue-router'
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
import page404 from './components/404page'
import MachinePerformance from './components/MachinePerformance'
import ElectricSavingMachine from './components/ElectricSavingMachine'
import PlanPreview from './components/PlanPreview'
import WorkOrderPlan from './components/WorkOrderPlan'
import DataKeyIn from './components/ProductDataKeyIn'

Vue.use(VueRouter);


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
      { path: '/overview/*' , redirect: '/error/404' },
    ],
  },
  { path: '/productStatic', component: Layout,
    children: [
      { path: '/productStatic/machinePerform' , component: MachinePerformance },
      { path: '/productStatic/*' , redirect: '/error/404' },
    ],
  },
  { path: '/productSchedule', component: Layout,
    children: [
      { path: '/productSchedule/data_key_in' , component: DataKeyIn },
      { path: '/productSchedule/plan_preview' , component: PlanPreview },
      { path: '/productSchedule/work_order_plan' , component: WorkOrderPlan },
      { path: '/productSchedule/*' , redirect: '/error/404' },
    ],
  },
  { path: '/maintain', component: Layout,
    children: [
      { path: '/maintain/mold', component: MoldMaintain },
      { path: '/maintain/machine', component: MachineMaintain },
      { path: '/maintain/partno', component: PartNoMaintain },
      { path: '/maintain/*' , redirect: '/error/404' },
    ],
  },
  { path: '/saving', component: Layout,
    children: [
      { path: '/saving/machine', component: ElectricSavingMachine },
      { path: '/saving/*' , redirect: '/error/404' },
    ],
  },
  { path: '/error' , component: Layout,
    redirect: '/error/404',
    children: [
      { path: '/error/404', component: page404 },
    ],
  },
  { path: '*' , redirect: '/error/404' },
]



export default new VueRouter({
  mode: 'history',
  routes: routes,
  base: '/nwe',
})