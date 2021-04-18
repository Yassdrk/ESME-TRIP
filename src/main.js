import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Liste from './components/Liste'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Voyage from './components/Voyage'
import Signup from './components/Signup'
import Compte from './components/Compte'
import Admin from './components/Admin'
import AddTrip from './components/AddTrip'
import MyTrip from './components/MyTrip'
import AddDate from './components/AddDate'
import UserList from './components/UserList'
import Success from './components/Success'
import TripList from './components/TripList'
import SejourList from './components/SejourList'
import Settings from './components/Settings'


import Checkout from './components/Checkout'
import Assistance from './components/Assistance'





import Vuelidate from 'vuelidate'
import VueCarousel from 'vue-carousel'

// Require dependencies
var VueCookies = require('vue-cookies');
// Tell Vue to use the plugin


Vue.use(VueRouter);
Vue.use(VueCarousel);
Vue.use(Vuelidate);
Vue.use(VueCookies);


const routes = [
  { path:  '/liste', component: Liste },
  { path:  '/checkout/:id/:id2', component: Checkout },
  { path:  '/success', component: Success },
  { path:  '/admin/sejourslist', component: SejourList,
  meta: {
    is_admin: true,
    requiresAuth: true,
    } },
    { path:  '/admin/settings', component: Settings,
    meta: {
      is_admin: true,
      requiresAuth: true,
      } },
     


 { 
  path: '/mytrip', 
  component: MyTrip,
  name: 'MyTrip',
  meta: {
    requiresAuth: true,
  }
  },
  { path:  '/assistance', component: Assistance },

  { path:  '/admin/adddate',
  component: AddDate,
  meta: {
    is_admin: true,
    requiresAuth: true,
    }
    },
  { path: '/login', component: Login,
meta:{
  guest: true,
}},
  { path: '/signup', component: Signup},
  { path: '/voyage/:id', component: Voyage},
  { 
  path: '/compte', 
  component: Compte,
  name: 'Compte',
  meta: {
    requiresAuth: true,
  }
  },
  {
  path: '/admin',
  name: 'admin',
  component: Admin,
  meta: {
  is_admin: true,
  requiresAuth: true,
  }
  },
  {
  path: '/admin/addtrip', 
  component: AddTrip,
  meta: {
  is_admin: true,
  requiresAuth: true,
  }
  },
  {
    path: '/admin/userlist', 
    component: UserList,
    meta: {
    is_admin: true,
    requiresAuth: true,
    }
    },
    {
      path: '/admin/triplist', 
      component: TripList,
      meta: {
      is_admin: true,
      requiresAuth: true,
      }
      },
  { path: '/', component: Home },
  { path: '/404', component: NotFound },  
  { path: '*', redirect: '/404' },

]; 


const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

router.beforeEach((to, from, next) => {
  
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
        next({
            path: '/login',
            params: { nextUrl: to.fullPath }
        })
    }else{
      if(to.matched.some(record => record.meta.is_admin)) {
        if(localStorage.getItem('admin') == 1 ){
               next()
        }else{
          next({ name: "Compte"})
        }

                
      }else {
        next()
      }

    }
} else if(to.matched.some(record => record.meta.guest)) {
    if(localStorage.getItem('token') == null){
        next()
    }
    else{
        next({ name: 'Compte'})
    }
}else {
    next()
}
})
export default router