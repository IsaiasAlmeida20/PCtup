// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from './../views/Home.vue'
import LoginView from '../views/LoginView.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Post from '@/components/Post.vue'
/* import NewSetup from '@/components/NewSetup.vue'
import Favorites from '@/components/Favorites.vue'
import MySetups from '@/components/MySetups.vue' */

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'posts',
        component: Post
      }/* ,
      {
        path: '/new-setup',
        name: 'new-setup',
        component: NewSetup
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: Favorites
      },
      {
        path: '/my-setups',
        name: 'my-setups',
        component: MySetups
      }, */
    ]
  },
  {
    path: '/login',
    name: 'login-view',
    component: LoginView,
    children: [
      {
        path: '',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
