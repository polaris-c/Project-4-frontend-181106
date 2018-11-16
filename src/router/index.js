import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'NULL',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/user-profile/index'),
        meta: { title: 'Home', icon: 'user' }
      }
    ]
  },

  {
    path: '/handbook',
    component: Layout,
    redirect: '/handbook/index',
    name: 'Handbook',
    children: [
      {
        path: 'index',
        name: 'HandbookIndex',
        component: () => import('@/views/handbook/index'),
        meta: { title: 'Handbook', icon: 'handbook' }
      }
    ]
  },

  {
    path: '/userManagement',
    component: Layout,
    name: 'UserManagement',
    meta: { title: 'UserMag', icon: 'peoples' },
    children: [
      {
        path: 'index',
        name: 'UserList',
        component: () => import('@/views/user-management/index'),
        meta: { title: 'UserList', icon: 'list' }
      },
      {
        path: 'create',
        name: 'NewUser',
        component: () => import('@/views/user-management/create'),
        meta: { title: 'NewUser', icon: 'people' }
      }
    ]
  },

  {
    path: '/options',
    component: Layout,
    name: 'Options',
    meta: { title: 'Options', icon: 'options' },
    children: [
      {
        path: 'detectionDevice',
        name: 'DetectionDevice',
        component: () => import('@/views/options/device-detection'),
        meta: { title: 'Device', icon: 'devices' }
      },
      {
        path: 'detectionMethod',
        name: 'DetectionMethod',
        component: () => import('@/views/options/method-detection'),
        meta: { title: 'Method', icon: 'method' }
      }
    ]
  },

  {
    path: '/message',
    component: Layout,
    // redirect: '/message/newMessage',
    name: 'Message',
    meta: { title: 'Message', icon: 'email' },
    children: [
      {
        path: 'newMessage',
        name: 'NewMessage',
        component: () => import('@/views/message/index'),
        meta: { title: 'NewMsg', icon: 'form' }
      },
      {
        path: 'sentMessage',
        name: 'SentMessage',
        component: () => import('@/views/message/sent-message'),
        meta: { title: 'SentMsg', icon: 'guide' }
      },
      {
        path: 'receivedMessage',
        name: 'ReceivedMessage',
        component: () => import('@/views/message/received-message'),
        meta: { title: 'ReceivedMsg', icon: 'message' }
      }
    ]
  },

  {
    path: '/sampleManagement',
    component: Layout,
    redirect: '/sampleManagement/deviceSample',
    name: 'SampleManagement',
    meta: { title: 'Sample', icon: 'tab' },
    children: [
      {
        path: 'explosiveSample',
        name: 'ExplosiveSample',
        component: () => import('@/views/sample-management/explosive-sample/explosive-sample'),
        meta: { title: 'ExplosiveSample', icon: '' }
      },
      {
        path: 'deviceSample',
        name: 'DeviceSample',
        component: () => import('@/views/sample-management/device-sample/device-index'),
        redirect: '/sampleManagement/deviceSample/deviceIndexList/deviceList',
        meta: { title: 'DeviceSample' },
        // hidden: true,
        children: [
          {
            path: 'deviceCreation',
            name: 'DeviceCreation',
            component: () => import('@/views/sample-management/device-sample/device-creation'),
            meta: { title: 'DeviceCreation', icon: '' },
            // hidden: true
          },
          {
            path: 'deviceIndexList',
            name: 'DeviceIndexList',
            component: () => import('@/views/sample-management/device-sample/device-index-list'),
            redirect: '/sampleManagement/deviceSample/deviceIndexList/deviceList',
            meta: { title: '', icon: '' },
            children: [
              {
                path: 'deviceList',
                name: 'DeviceList',
                component: () => import('@/views/sample-management/device-sample/device-list'),
                meta: { title: 'DeviceList', icon: '' },
              },
              {
                path: 'deviceUpdate',
                name: 'DeviceUpdate',
                component: () => import('@/views/sample-management/device-sample/device-update'),
                meta: { title: 'DeviceUpdate', icon: '' },
                hidden: true
              },
              {
                path: 'deviceDetail',
                name: 'DeviceDetail',
                component: () => import('@/views/sample-management/device-sample/device-detail'),
                meta: { title: 'DeviceDetail', icon: '' },
                hidden: true
              },
              {
                path: 'deviceDetailIngredient',
                name: 'DeviceDetailIngredient',
                component: () => import('@/views/sample-management/device-sample/device-detail-ingredient'),
                meta: { title: 'DeviceDetailIngredient', icon: '' },
                hidden: true
              },
              {
                path: 'deviceDetailAppearance',
                name: 'DeviceDetailAppearance',
                component: () => import('@/views/sample-management/device-sample/device-Detail-Appearance'),
                meta: { title: 'DeviceDetailAppearance', icon: '' },
                hidden: true
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: '/evidenceManagement',
    component: Layout,
    name: 'EvidenceManagement',
    meta: { title: 'Evidence', icon: 'dashboard' },
    children: [
      {
        path: 'explosiveEvidence',
        name: 'ExplosiveEvidence',
        component: () => import('@/views/evidence-management/explosive-evidence'),
        meta: { title: 'ExplosiveEvidence', icon: 'table' }
      },
      {
        path: 'deviceEvidence',
        name: 'DeviceEvidence',
        component: () => import('@/views/evidence-management/device-evidence'),
        meta: { title: 'DeviceEvidence', icon: 'table' }
      }
    ]
  },

  {
    path: '/analysis',
    component: Layout,
    name: 'Analysis',
    meta: { title: 'Analysis', icon: 'chart' },
    children: [
      {
        path: 'explosive',
        name: 'Explosive',
        component: () => import('@/views/analysis/explosive-analysis'),
        meta: { title: 'Explosive', icon: 'table' }
      },
      {
        path: 'device',
        name: 'Device',
        component: () => import('@/views/analysis/device-analysis'),
        meta: { title: 'Device', icon: 'table' }
      }
    ]
  },

  {
    path: '/result',
    component: Layout,
    name: 'Result',
    meta: { title: 'Result', icon: 'clipboard' },
    children: [
      {
        path: 'explosive',
        name: 'Explosive',
        component: () => import('@/views/result/explosive-result'),
        meta: { title: 'Explosive', icon: 'table' }
      },
      {
        path: 'device',
        name: 'Device',
        component: () => import('@/views/result/device-result'),
        meta: { title: 'Device', icon: 'table' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
