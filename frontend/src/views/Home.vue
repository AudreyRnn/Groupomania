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
  beforeCreate: function () {
    if (localStorage.getItem("user") == null || this.$store.state.user.userId == -1) {
      this.$router.push('/Login');
    }
    return;
  },
  components: {
    headerCompo,
    createPost,
    postslist,
    
    
  }
}
  
</script>

<style lang="scss">


</style>
