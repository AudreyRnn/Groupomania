import { createWebHistory, createRouter } from "vue-router";


import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
const routes = [
{
    name: 'Login',
    path:'/Login',
    component: Login,
  },
  { 
    name: 'Home',
    path: '/', 
    component: Home, 
    props:true 
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;