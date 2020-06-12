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
import History from './components/History'
import Security from './components/SecurityBoard'

Vue.use(VueRouter);


// const routes = [
//   { path: '/', redirect: '/login' },
//   { path: '/login', component: Login },
//   { path: '/overview', component: Layout,
//     redirect: '/overview/dashboard',
//     children: [
//       { path: '/overview/dashboard', component: Dashboard },
//       { path: '/overview/dashboard/defectrate', component: DefectRate },
//       { path: '/overview/work_order', component: WorkOrderBoard },
//       { path: '/overview/machine/:line', component: MachineBoard },
//       { path: '/overview/plan', component: PlanBoard },
//       { path: '/overview/security/:line', component: Security },
//       { path: '/overview/*' , redirect: '/error/404' },
//     ],
//   },
//   { path: '/productStatic', component: Layout,
//     children: [
//       { path: '/productStatic/machinePerform' , component: MachinePerformance },
//       { path: '/productStatic/*' , redirect: '/error/404' },
//     ],
//   },
//   { path: '/productSchedule', component: Layout,
//     children: [
//       { path: '/productSchedule/data_key_in' , component: DataKeyIn },
//       { path: '/productSchedule/plan_preview' , component: PlanPreview },
//       { path: '/productSchedule/work_order_plan' , component: WorkOrderPlan },
//       { path: '/productSchedule/history' , component: History },
//       { path: '/productSchedule/*' , redirect: '/error/404' },
//     ],
//   },
//   { path: '/maintain', component: Layout,
//     children: [
//       { path: '/maintain/mold', component: MoldMaintain },
//       { path: '/maintain/machine', component: MachineMaintain },
//       { path: '/maintain/partno', component: PartNoMaintain },
//       { path: '/maintain/*' , redirect: '/error/404' },
//     ],
//   },
//   { path: '/saving', component: Layout,
//     children: [
//       { path: '/saving/machine', component: ElectricSavingMachine },
//       { path: '/saving/*' , redirect: '/error/404' },
//     ],
//   },
//   { path: '/error' , component: Layout,
//     redirect: '/error/404',
//     children: [
//       { path: '/error/404', component: page404 },
//     ],
//   },
//   { path: '*' , redirect: '/error/404' },
// ]

export const constantRoutes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  // { path: '/saving', component: Layout,
  //   children: [
  //     { path: '/saving/machine', component: ElectricSavingMachine },
  //     { path: '/saving/*' , redirect: '/error/404' },
  //   ],
  // },
  // { path: '/error' , component: Layout,
  //   redirect: '/error/404',
  //   children: [
  //     { path: '/error/404', component: page404 },
  //   ],
  // }
  // { path: '*' , redirect: '/error/404' },
]
// 動態路由
export const asyncRoutes = [
  {
    path: '/',
    redirect: '/overview/dashboard',
    // meta: {
    //   role: [
    //     'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
    //     'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
    //   ]
    // },
  },
  {
    path: '/login',
    component: Login,
    // meta: {
    //   role: [
    //     'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
    //     'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
    //   ]
    // },
  },
  {
    path: '/overview', component: Layout,
    redirect: '/overview/dashboard',
    meta: {
      role: [
        'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
        'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
      ]
    },
    children: [
      {
        path: '/overview/dashboard',
        component: Dashboard,
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      {
        path: '/overview/dashboard/defectrate',
        component: DefectRate,
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      {
        path: '/overview/work_order',
        component: WorkOrderBoard,
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      {
        path: '/overview/machine/:line',
        component: MachineBoard,
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      {
        path: '/overview/plan',
        component: PlanBoard,
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      {
        path: '/overview/security/:line',
        component: Security,
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      { path: '/overview/*' , redirect: '/error/404' },
    ],
  },
  {
    path: '/productStatic', component: Layout,
    meta: {
      role: [
        'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
        'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
      ]
    },
    children: [
      {
        path: '/productStatic/machinePerform' ,
        component: MachinePerformance ,
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      { path: '/productStatic/*' , redirect: '/error/404' },
    ],
  },
  {
    path: '/productSchedule', component: Layout,
    meta: {
      role: ['website_maintainer', 'site_manager', 'product_manager']
    },
    children: [
      {
        path: '/productSchedule/data_key_in' ,
        component: DataKeyIn,
        meta: { role: ['website_maintainer', 'product_manager'] },
      },
      {
        path: '/productSchedule/plan_preview' ,
        component: PlanPreview,
        meta: { role: ['website_maintainer', 'product_manager'] },
      },
      {
        path: '/productSchedule/work_order_plan' ,
        component: WorkOrderPlan,
        meta: { role: ['website_maintainer', 'product_manager'] },
      },
      {
        path: '/productSchedule/history' ,
        component: History,
        meta: { role: ['website_maintainer', 'site_manager', 'product_manager'] },
      },
      {
        path: '/productSchedule/*' ,
        redirect: '/error/404'
      },
    ],
  },
  {
    path: '/maintain', component: Layout,
    meta: {
      role: [
        'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
        'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
      ]
    },
    children: [
      {
        path: '/maintain/mold',
        component: MoldMaintain,
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      {
        path: '/maintain/machine',
        component: MachineMaintain,
        meta: { role: ['website_maintainer', 'process_engineer'] },
      },
      {
        path: '/maintain/partno',
        component: PartNoMaintain,
        meta: { role: ['website_maintainer', 'product_manager'] },
      },
      {
        path: '/maintain/*' ,
        redirect: '/error/404'
      },
    ],
  },
  { path: '/saving', component: Layout,
    children: [
      {
        path: '/saving/machine',
        component: ElectricSavingMachine,
        meta: { role: ['website_maintainer','visitor'] },
      },
      {
        path: '/saving/*' , redirect: '/error/404' },
    ],
  },
  { path: '/error' , component: Layout,
    redirect: '/error/404',
    meta: {
      role: [
        'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
        'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
      ]
    },
    children: [
      {
        path: '/error/404',
        component: page404,
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
    ],
  },
  { path: '*' , redirect: '/error/404' },
]

// export default new VueRouter({
//   mode: 'history',
//   routes: constant_routes,
//   base: '/nwe',
// })

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: asyncRoutes,
  base: '/nwe',
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
