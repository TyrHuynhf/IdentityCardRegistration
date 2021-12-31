import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    return next();
    return;
  }
  next('/')
}
const ifNotAdmin = (to, from, next) => {
  if (!store.getters.isAdmin) {
    return next();
    return;
  }
  next('/admin')
}
const ifNotPolice = (to, from, next) => {
  if (!store.getters.isPolice) {
    return next();
    return;
  }
  next('/police')
}
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    return next();
    return;
  }
  next("/login");
};

const ifAdmin = (to, from, next) => {
  if (store.getters.isAdmin) {
    return next();
    return;
  }
  next('/adminLogin')
}
const ifPolice = (to, from, next) => {
  if (store.getters.isPolice) {
    return next();
    return;
  }
  next('/policeLogin')
}
const routes = [
  {
    path: '/',
    redirect: 'registryIdentityCardCitizen',
  },
  {
    path:'/datatableTest',
    name:'datatable',
    component: () => import('@/views/pages/datatableTest.vue')
  },
  {
    path: '/admin',
    redirect: 'queryCity',
  },
  {
    path: '/police',
    redirect: 'registryIdentityCard',
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'blank',
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/policeLogin',
    name: 'policeLogin',
    component: () => import('@/views/auth/PoliceLogin.vue'),
    meta: {
      layout: 'blank',
    },
     beforeEnter: ifNotPolice,
  },
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: () => import('@/views/auth/AdminLogin.vue'),
    meta: {
      layout: 'blank',
    },
    beforeEnter: ifNotAdmin,
  },

  {
    path: '/admin/userManagement',
    name: 'adminUserManagement',
    component: () => import('@/views/adminControl/UserManagement/User.vue'),
    meta: {
      layout: 'admin',
    },
    beforeEnter: ifAdmin
  },
  {
    path: '/registryIdentityCard',
    name:'registryIdentityCard',
    component:() => import('@/views/RegistryCard/RegisterIdentityCard.vue'),
    meta: {
      layout: 'police'
    },
    beforeEnter: ifPolice,
  },
  {
    path: '/registryIdentityCardCitizen',
    name:'registryIdentityCardCitizen',
    component:() => import('@/views/citizen/RegistryCard/RegisterIdentityCard.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/queryCardCitizen',
    name:'queryCardCitizen',
    component:() => import('@/views/citizen/QueryCard/Card.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/addCity',
    name:'addCity',
    component:() => import('@/views/adminControl/CityManagement/addCity'),
    meta:{
      layout: 'admin'
    },
    beforeEnter: ifAdmin,
  },
  {
    path: '/queryCity',
    name:'queryCity',
    component:() => import('@/views/adminControl/CityManagement/City'),
    meta:{
      layout: 'admin'
    },
    beforeEnter: ifAdmin,
  },
  {
    path: '/queryCard',
    name:'queryCard',
    component: () => import('@/views/queryCard/Card.vue'),
    beforeEnter: ifPolice,
    meta:{
      layout: 'police'
    },
  },
  {
    path: '/policeManage/citizen',
    name:'policeCitizenManage',
    component: () => import('@/views/police/user/CitizenUser.vue'),
    beforeEnter: ifPolice,
    meta:{
      layout: 'police'
    },
  },
  {
    path: '/policeManage/statistic',
    name: 'policeStatistic',
    component: () => import('@/views/police/statistics/statistic.vue'),
    beforeEnter: ifPolice,
    meta: {
      layout: 'police'
    }
  },
  {
    path: '/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
    beforeEnter: ifAuthenticated,
    props: true
  },
  {
    path: '/admin-account-settings',
    name: 'admin-account-settings',
    component: () => import('@/views/pages/admin-account-settings/AdminAccountSettings.vue'),
    beforeEnter: ifAdmin,
    meta: {
      layout: 'admin',
    },
    props: true
  },
  {
    path: '/police-account-settings',
    name: 'police-account-settings',
    component: () => import('@/views/pages/police-account-settings/PoliceAccountSettings.vue'),
    beforeEnter: ifPolice,
    meta: {
      layout: 'police',
    },
    props: true
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
