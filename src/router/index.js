import Vue from 'vue'
import VueRouter from 'vue-router'
import beforeLoginLayout from "../layout/beforeLoginLayout";
import afterLoginLayout from "../layout/afterLoginLayout";
import store from '../store/store'

Vue.use(VueRouter)
const routes = [
  {
    name: "Dashboard",
    component: afterLoginLayout,
    props: {
      icon: "mdi-monitor-dashboard",
      open: true
    },
    path: "",
    children: [
      {
        name: "Home",
        component: () => import("@/views/Dashboard/Home.vue"),
        path: "/"
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    name: "Auth",
    component: beforeLoginLayout,
    props: {
      icon: "mdi-clipboard-account-outline",
      subtitle: "Pages",
      open: true
    },

    path: "/auth",
    meta: {
      hideForAuth: true
    },
    children: [
      {
        name: "Register",
        component: () => import("@/views/Pages/Auth/Register.vue"),
        path: "/register"
      },
      {
        name: "Login",
        component: () => import("@/views/Pages/Auth/Login.vue"),
        path: "/login"
      }
    ]
  }
];



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
   if (to.name !== 'Login' && to.name !== 'Register' && (!store.state.authenticate.isAuthenticate || store.state.authenticate.token == null ))
       next({ name: 'Login' })
  else if (to.name == 'Login' && store.state.authenticate.isAuthenticate && store.state.authenticate.token !== null)
     next({ name: 'Home' })
  next()
})
router.afterEach( ()=> {
  store.dispatch('hideLoading');
  store.dispatch('hideAlert');
})

export default router




