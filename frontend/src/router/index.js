import { createWebHistory, createRouter } from "vue-router";


import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import ModifyPost from"@/views/ModifyPost.vue";
import createPost from "@/views/createPost.vue";


const routes = [


  {
    name: "Home",
    path: "/",
    component: Home,
    meta: {
      title : 'home'
    }
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta : {
      title : 'connexion'
    }
  },
  
  {
    name: "Publish",
    path: "/publish",
    component: createPost,
    props: true,
    meta : {
      title: 'publish'
    }
  },
  {
    name: "Modifier",
    path: "/modifier",
    component: ModifyPost,
    meta : {
      title: 'update'
  },
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.afterEach((to) =>{
  document.title = to.meta.title;
});

export default router;