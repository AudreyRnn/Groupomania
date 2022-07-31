<template>
 
  <headerCompo />
  <createPost />
  <postslist />


</template>

<script>


import headerCompo from "@/components/headerCompo.vue";
import createPost from "@/components/createPost.vue";
import postslist from "@/components/postslist.vue";


export default {
  name: 'Home',
  components: {
    headerCompo,
    createPost,
    postslist,
    
    
  }
}
  
</script>

<style lang="scss">


</style>
