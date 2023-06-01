import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SetupView from '@/components/setup/SetupView.vue'
import Login from '@/components/login/Login.vue'
import Register from '@/components/register/Register.vue'
import NewSetup from '@/components/new-setup/NewSetup.vue'
import SetupDescription from '@/components/new-setup/SetupDescription.vue'
import SetupImage from '@/components/new-setup/SetupImage.vue'
import Favorites from '@/components/favorites/Favorites.vue'
import MySetups from '@/components/my-setups/MySetups.vue'
import Profile from '@/components/profile/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'setups',
        component: SetupView
      },
      {
        path: '/new-setup',
        component: NewSetup,
        children: [
          {
            path: '',
            component: SetupDescription
          },
          {
            path: '/image',
            name: 'image',
            component: SetupImage
          }
        ]
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
      },
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
  {
    path: '/profile',
    name: 'profile-view',
    component: ProfileView,
    children: [
      {
        path: '',
        name: 'profile',
        component: Profile
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
