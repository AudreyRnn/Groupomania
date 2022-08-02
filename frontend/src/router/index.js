import { createWebHistory, createRouter } from "vue-router";


import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import ModifyPost from"@/views/ModifyPost.vue";
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
  {
    name:'Modifier',
    path:'/Modifier',
    component:ModifyPost,
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;