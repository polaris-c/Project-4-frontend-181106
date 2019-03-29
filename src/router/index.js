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
    path: '/handbook',
    component: Layout,
    redirect: '/handbook/index',
    name: 'Handbook',
    children: [
      {
        path: 'index',
        name: 'HandbookIndex',
        component: () => import('@/views/handbook/index'),
        meta: { title: '指 南', icon: 'handbook' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/userProfile',
    name: 'Home',
    meta: { title: '用户主页', icon: 'example' },
    children: [
      {
        path: 'userProfile',
        name: 'UserProfile',
        component: () => import('@/views/home/user-profile'),
        meta: { title: '用户信息', icon: 'user' }
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/views/home/message/home-index-message'),
        redirect: '/message/messageCreation',
        meta: { title: '咨询消息', icon: 'email' },
        children: [
          {
            path: 'messageCreation',
            name: 'MessageCreation',
            component: () => import('@/views/home/message/message-creation'),
            meta: { title: '消息创建', icon: 'form' }
          },
          {
            path: 'messageSent',
            name: 'MessageSent',
            component: () => import('@/views/home/message/message-sent'),
            meta: { title: '已发送', icon: 'guide' }
          },
          {
            path: 'messageReceived',
            name: 'MessageReceived',
            component: () => import('@/views/home/message/message-received'),
            meta: { title: '已接收', icon: 'message' }
          },
          {
            path: 'messageDetail',
            name: 'MessageDetail',
            component: () => import('@/views/home/message/message-detail'),
            meta: { title: '消息详情' },
            hidden: true
          }
        ]
      }
    ]
  },

  {
    path: '/userManagement',
    component: Layout,
    redirect: '/userManagement/userIndexList/userList',
    name: 'UserManagement',
    meta: { title: '人员管理', icon: 'peoples' },
    children: [
      {
        path: 'userCreation',
        name: 'UserCreation',
        component: () => import('@/views/user-management/user-creation'),
        meta: { title: '人员创建', icon: 'people' }
      },
      {
        path: 'userIndexList',
        name: 'UserIndexList',
        component: () => import('@/views/user-management/user-index-list'),
        meta: { title: '', icon: '' },
        children: [
          {
            path: 'userList',
            name: 'UserList',
            component: () => import('@/views/user-management/user-list'),
            meta: { title: '人员列表', icon: 'list' }
          },
          {
            path: 'userDetail/:id',
            name: 'UserDetail',
            component: () => import('@/views/user-management/user-detail'),
            meta: { title: '人员详情', icon: '' },
            hidden: true
          },
          {
            path: 'userUpdate/:id',
            name: 'UserUpdate',
            component: () => import('@/views/user-management/user-update'),
            meta: { title: '人员修改', icon: '' },
            hidden: true
          }
        ]
      }
    ]
  },

  {
    path: '/options',
    component: Layout,
    name: 'Options',
    meta: { title: '检测设置', icon: 'options' },
    children: [
      {
        path: 'detectionDevice',
        name: 'DetectionDevice',
        component: () => import('@/views/options/device-detection'),
        meta: { title: '检测设备', icon: 'devices' }
      },
      {
        path: 'detectionMethod',
        name: 'DetectionMethod',
        component: () => import('@/views/options/method-detection'),
        meta: { title: '检测方法', icon: 'method' }
      }
    ]
  },

  {
    path: '/sampleManagement',
    component: Layout,
    redirect: '/sampleManagement/explosiveSample',
    name: 'SampleManagement',
    meta: { title: '样本管理', icon: 'tab' },
    children: [
      {
        path: 'explosiveSample',
        name: 'ExplosiveSample',
        component: () => import('@/views/sample-management/explosive-sample/explosive-index'),
        redirect: '/sampleManagement/explosiveSample/explosiveIndexList/explosiveList',
        meta: { title: '炸药与原材料', icon: '' },
        children: [
          {
            path: 'explosiveCreation',
            name: 'ExplosiveCreation',
            component: () => import('@/views/sample-management/explosive-sample/explosive-creation'),
            meta: { title: '新增样本' }
          },
          {
            path: 'explosiveIndexList',
            name: 'ExplosiveIndexList',
            component: () => import('@/views/sample-management/explosive-sample/explosive-index-list'),
            redirect: '/sampleManagement/explosiveSample/explosiveIndexList/explosiveList',
            meta: { title: '' },
            children: [
              {
                path: 'explosiveList',
                name: 'ExplosiveList',
                component: () => import('@/views/sample-management/explosive-sample/explosive-list'),
                meta: { title: '样本列表' }
              },
              {
                path: 'explosiveDetail/:id',
                name: 'ExplosiveDetail',
                component: () => import('@/views/sample-management/explosive-sample/explosive-detail'),
                meta: { title: '样本详情' },
                hidden: true
              },
              {
                path: 'explosiveUpdate/:id',
                name: 'ExplosiveUpdate',
                component: () => import('@/views/sample-management/explosive-sample/explosive-update'),
                meta: { title: '样本修改' },
                hidden: true
              },
            ]
          }
        ]
      },
      {
        path: 'deviceSample',
        name: 'DeviceSample',
        component: () => import('@/views/sample-management/device-sample/device-index'),
        redirect: '/sampleManagement/deviceSample/deviceIndexList/deviceList',
        meta: { title: '爆炸装置' },
        // hidden: true,
        children: [
          {
            path: 'deviceCreation',
            name: 'DeviceCreation',
            component: () => import('@/views/sample-management/device-sample/device-creation'),
            meta: { title: '新增样本', icon: '' },
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
                meta: { title: '样本列表', icon: '' },
              },
              {
                path: 'deviceUpdate/:id',
                name: 'DeviceUpdate',
                component: () => import('@/views/sample-management/device-sample/device-update'),
                meta: { title: '样本修改', icon: '' },
                hidden: true
              },
              {
                path: 'deviceDetail/:id',
                name: 'DeviceDetail',
                component: () => import('@/views/sample-management/device-sample/device-detail'),
                meta: { title: '样本详情', icon: '' },
                hidden: true
              },
              {
                path: 'deviceDetailIngredient/:id',
                name: 'DeviceDetailIngredient',
                component: () => import('@/views/sample-management/device-sample/device-detail-ingredient'),
                meta: { title: '零件成分', icon: '' },
                hidden: true
              },
              {
                path: 'deviceDetailAppearance/:id',
                name: 'DeviceDetailAppearance',
                component: () => import('@/views/sample-management/device-sample/device-Detail-Appearance'),
                meta: { title: '零件形态', icon: '' },
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
    redirect: '/evidenceManagement/deviceEvidence',
    name: 'EvidenceManagement',
    meta: { title: '物证管理', icon: 'dashboard' },
    children: [
      {
        path: 'explosiveEvidence',
        name: 'ExplosiveEvidence',
        component: () => import('@/views/evidence-management/explosive-evidence/explosive-index'),
        redirect: '/evidenceManagement/explosiveEvidence/explosiveIndexList/explosiveList',
        meta: { title: '炸药与原材料', icon: '' },
        children: [
          {
            path: 'explosiveCreation',
            name: 'ExplosiveCreation',
            component: () => import('@/views/evidence-management/explosive-evidence/explosive-creation'),
            meta: { title: '新增物证' }
          },
          {
            path: 'explosiveIndexList',
            name: 'ExplosiveIndexList',
            component: () => import('@/views/evidence-management/explosive-evidence/explosive-index-list'),
            redirect: '/evidenceManagement/explosiveEvidence/explosiveIndexList/explosiveList',
            meta: { title: '' },
            children: [
              {
                path: 'explosiveList',
                name: 'ExplosiveList',
                component: () => import('@/views/evidence-management/explosive-evidence/explosive-list'),
                meta: { title: '物证列表' }
              },
              {
                path: 'explosiveDetail/:id',
                name: 'ExplosiveDetail',
                component: () => import('@/views/evidence-management/explosive-evidence/explosive-detail'),
                meta: { title: '物证详情' },
                hidden: true
              },
              {
                path: 'explosiveUpdate/:id',
                name: 'ExplosiveUpdate',
                component: () => import('@/views/evidence-management/explosive-evidence/explosive-update'),
                meta: { title: '物证更新' },
                hidden: true
              },
            ]
          }
        ]
      },
      {
        path: 'deviceEvidence',
        name: 'DeviceEvidence',
        component: () => import('@/views/evidence-management/device-evidence/device-index'),
        redirect: '/evidenceManagement/deviceEvidence/deviceIndexList/deviceList',
        meta: { title: '爆炸装置残片' },
        // hidden: true,
        children: [
          {
            path: 'deviceCreation',
            name: 'DeviceCreation',
            component: () => import('@/views/evidence-management/device-evidence/device-creation'),
            meta: { title: '新增物证', icon: '' },
            // hidden: true
          },
          {
            path: 'deviceIndexList',
            name: 'DeviceIndexList',
            component: () => import('@/views/evidence-management/device-evidence/device-index-list'),
            redirect: '/evidenceManagement/deviceEvidence/deviceIndexList/deviceList',
            meta: { title: '', icon: '' },
            children: [
              {
                path: 'deviceList',
                name: 'DeviceList',
                component: () => import('@/views/evidence-management/device-evidence/device-list'),
                meta: { title: '物证列表', icon: '' },
              },
              {
                path: 'deviceUpdate/:id',
                name: 'DeviceUpdate',
                component: () => import('@/views/evidence-management/device-evidence/device-update'),
                meta: { title: '物证修改', icon: '' },
                hidden: true
              },
              {
                path: 'deviceDetail/:id',
                name: 'DeviceDetail',
                component: () => import('@/views/evidence-management/device-evidence/device-detail'),
                meta: { title: '物证详情', icon: '' },
                hidden: true
              },
              {
                path: 'deviceDetailIngredient/:id',
                name: 'DeviceDetailIngredient',
                component: () => import('@/views/evidence-management/device-evidence/device-detail-ingredient'),
                meta: { title: '残片成分', icon: '' },
                hidden: true
              },
              {
                path: 'deviceDetailAppearance/:id',
                name: 'DeviceDetailAppearance',
                component: () => import('@/views/evidence-management/device-evidence/device-Detail-Appearance'),
                meta: { title: '残片形态', icon: '' },
                hidden: true
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: '/analysis',
    component: Layout,
    redirect: '/analysis/explosiveAnalysis',
    name: 'Analysis',
    meta: { title: '分析研判', icon: 'chart' },
    children: [
      {
        path: 'explosiveAnalysis',
        name: 'ExplosiveAnalysis',
        component: () => import('@/views/analysis/explosive-analysis/explosive-index'),
        redirect: '/analysis/explosiveAnalysis/explosiveList',
        meta: { title: '', icon: 'table' },
        children: [
          {
            path: 'explosiveList',
            name: 'ExplosiveList',
            component: () => import('@/views/analysis/explosive-analysis/explosive-list'),
            meta: { title: '炸药与原材料' }
          },
          {
            path: 'explosiveDetail/:id',
            name: 'ExplosiveDetail',
            component: () => import('@/views/analysis/explosive-analysis/explosive-detail'),
            meta: { title: '炸药与原材料比对' },
            hidden: true
          }
        ]
      },
      {
        path: 'deviceAnalysis',
        name: 'DeviceAnalysis',
        component: () => import('@/views/analysis/device-analysis/device-index'),
        redirect: '/analysis/deviceAnalysis/deviceList',
        meta: { title: '', icon: 'table' },
        children: [
          {
            path: 'deviceList',
            name: 'DeviceList',
            component: () => import('@/views/analysis/device-analysis//device-list'),
            meta: { title: '爆炸装置残片' }
          },
          {
            path: 'deviceDetail/:id',
            name: 'DeviceDetail',
            component: () => import('@/views/analysis/device-analysis/device-detail'),
            meta: { title: '残片详情' },
            hidden: true
          },
          {
            path: 'deviceFilter',
            name: 'DeviceFilter',
            component: () => import('@/views/analysis/device-analysis/device-detail-filter'),
            meta: { title: 'DeviceFilter' },
            hidden: true
          },
          {
            path: 'deviceIngredient',
            name: 'DeviceIngredient',
            component: () => import('@/views/analysis/device-analysis/device-detail-ingredient'),
            meta: { title: '残片成分比对' },
            hidden: true
          },
          {
            path: 'deviceAppearance/:id',
            name: 'DeviceAppearance',
            component: () => import('@/views/analysis/device-analysis/device-detail-appearance'),
            meta: { title: '残片形态比对' },
            hidden: true
          },
          {
            path: 'deviceAppearanceCompare',
            name: 'DeviceAppearanceCompare',
            component: () => import('@/views/analysis/device-analysis/device-detail-appearance-Compare'),
            meta: { title: '形态比对详情' },
            hidden: true
          },
        ]
      }
    ]
  },

  {
    path: '/result',
    component: Layout,
    redirect: '/result/explosiveResult/explosiveList',
    name: 'Result',
    meta: { title: '研判结果', icon: 'clipboard' },
    children: [
      {
        path: 'explosiveResult',
        name: 'ExplosiveResult',
        component: () => import('@/views/result/explosive-result/explosive-index'),
        redirect: '/result/explosiveResult/explosiveList',
        meta: { title: '', icon: 'table' },
        children: [
          {
            path: 'explosiveList',
            name: 'ExplosiveList',
            component: () => import('@/views/result/explosive-result/explosive-list'),
            meta: { title: '炸药与原材料' }
          },
          {
            path: 'explosiveDetail/:id',
            name: 'ExplosiveDetail',
            component: () => import('@/views/result/explosive-result/explosive-detail'),
            meta: { title: '结果报告' },
            hidden: true
          }
        ]
      },
      {
        path: 'deviceResult',
        name: 'DeviceResult',
        component: () => import('@/views/result/device-result/device-index'),
        redirect: '/result/deviceResult/deviceList',
        meta: { title: '', icon: 'table' },
        children: [
          {
            path: 'deviceList',
            name: 'DeviceList',
            component: () => import('@/views/result/device-result/device-list'),
            meta: { title: '爆炸装置残片' }
          },
          {
            path: 'deviceDetail/:id',
            name: 'DeviceDetail',
            component: () => import('@/views/result/device-result/device-detail'),
            meta: { title: '结果报告' },
            hidden: true
          }
        ]
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
