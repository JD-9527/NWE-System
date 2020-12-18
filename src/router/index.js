import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 動態路由
export const asyncRoutes = [
  {
    path: '/',
    redirect: '/overview/dashboard',
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/components/Login'),
  },
  {
    path: '/overview',
    component: () => import('@/components/Layout'),
    redirect: '/overview/dashboard',
    meta: {
      role: [
        'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
        'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
      ]
    },
    children: [
      {
        name: 'Dashboard',
        path: '/overview/dashboard',
        component: () => import('@/components/overview/Dashboard'),
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      {
        name: 'DefectRate',
        path: '/overview/dashboard/defectrate',
        component: () => import('@/components/overview/defectRate'),
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      {
        name: 'WorkOrderBoard',
        path: '/overview/work_order',
        component: () => import('@/components/overview/WorkOrderBoard'),
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      {
        name: 'MachineBoard',
        path: '/overview/machine/:line',
        component: () => import('@/components/overview/MachineBoard'),
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      {
        name: 'SecurityBoard',
        path: '/overview/security/:line',
        component: () => import('@/components/overview/SecurityBoard'),
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
    path: '/productStatic',
    component: () => import('@/components/Layout'),
    meta: {
      role: [
        'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
        'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
      ]
    },
    children: [
      {
        name: 'MachinePerformance',
        path: '/productStatic/machinePerform' ,
        component: () => import('@/components/statistic/MachinePerformance') ,
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
    path: '/productSchedule',
    component: () => import('@/components/Layout'),
    meta: {
      role: ['website_maintainer', 'site_manager', 'product_manager']
    },
    children: [
      {
        name: 'ProductDataKeyIn',
        path: '/productSchedule/data_key_in' ,
        component: () => import('@/components/schedule/ProductDataKeyIn'),
        meta: { role: ['website_maintainer', 'product_manager'] },
      },
      {
        name: 'PlanPreview',
        path: '/productSchedule/plan_preview' ,
        component: () => import('@/components/schedule/PlanPreview'),
        meta: { role: ['website_maintainer', 'product_manager'] },
      },
      {
        name: 'WorkOrderPlan',
        path: '/productSchedule/work_order_plan' ,
        component: () => import('@/components/schedule/WorkOrderPlan'),
        meta: { role: ['website_maintainer', 'product_manager'] },
      },
      {
        name: 'History',
        path: '/productSchedule/history' ,
        component: () => import('@/components/schedule/History'),
        meta: { role: ['website_maintainer', 'site_manager', 'product_manager'] },
      },
      {
        path: '/productSchedule/*' ,
        redirect: '/error/404'
      },
    ],
  },
  {
    path: '/maintain',
    component: () => import('@/components/Layout'),
    meta: {
      role: [
        'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
        'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
      ]
    },
    children: [
      {
        name: 'MoldMaintain',
        path: '/maintain/mold',
        component: () => import('@/components/maintain/MoldMaintain'),
        meta: {
          role: [
            'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
            'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
          ]
        },
      },
      {
        name: 'MachineMaintain',
        path: '/maintain/machine',
        component: () => import('@/components/maintain/MachineMaintain'),
        meta: { role: ['website_maintainer', 'process_engineer'] },
      },
      {
        name: 'PartNoMaintain',
        path: '/maintain/partno',
        component: () => import('@/components/maintain/PartNoMaintain'),
        meta: { role: ['website_maintainer', 'product_manager'] },
      },
      {
        path: '/maintain/*' ,
        redirect: '/error/404'
      },
    ],
  },
  { path: '/saving',
    component: () => import('@/components/Layout'),
    children: [
      {
        name: 'ElectricSavingMachine',
        path: '/saving/machine',
        component: () => import('@/components/ElectricSavingMachine'),
        meta: { role: ['website_maintainer','visitor'] },
      },
      {
        path: '/saving/*' , redirect: '/error/404' },
    ],
  },
  { path: '/error' ,
    component: () => import('@/components/Layout'),
    redirect: '/error/404',
    meta: {
      role: [
        'website_maintainer', 'site_manager', 'product_manager', 'machine_maintainer',
        'mold_repairer', 'dispatcher', 'quality_assurance', 'process_engineer', 'visitor'
      ]
    },
    children: [
      {
        name: '404page',
        path: '/error/404',
        component: () => import('@/components/404page'),
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

export default new VueRouter({
  mode: 'history',
  routes: asyncRoutes,
  base: '/nwe',
})
