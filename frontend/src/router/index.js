import { createWebHistory, createRouter } from "vue-router";


import Home from "@/views/connexion.vue";
import Profile from "@/views/Profile.vue";
const routes = [
{
    name: 'Home',
    path:'/',
    component: Home,
  },
  { 
    name: 'profile',
    path: '/profile', 
    component: Profile, 
    props:true 
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;