import { createWebHistory, createRouter } from "vue-router";


import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import ModifyPost from"@/views/ModifyPost.vue";
import createPost from "@/views/createPost.vue";


const routes = [
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    name: "Home",
    path: "/",
    component: Home,
    props: true,
  },
  {
    name: "Publish",
    path: "/publish",
    component: createPost,
    props: true,
  },
  {
    name: "Modifier",
    path: "/modifier",
    component: ModifyPost,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;