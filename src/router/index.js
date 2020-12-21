import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import firebase from 'firebase/app'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main',
      auth: true
    },
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'empty'
    }, // som custom parameters of th route
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/DetailRecord.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/History.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Planning.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Record.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

//this will be called before each change of route
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requerAuth = to.matched.some(record => record.meta.auth)

  if (requerAuth && !currentUser) {
    next('login?message=login')
  } else {
    next()
  }
})

export default router;
