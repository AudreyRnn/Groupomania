<template>
 
  
  <headCompo />
  <createPost />
  <postslist />


</template>

<script>



import createPost from "@/components/createPost.vue";
import postslist from "@/components/postslist.vue";
import headCompo from "@/components/headCompo.vue";


export default {
  name: 'Home',
  // beforeCreate: function () {
  //   if (localStorage.getItem("user") == null || this.$store.state.user.userId == -1) {
  //     this.$router.push('/Login');
  //   }
  //   return;
  // },
  components: {
   
    createPost,
    postslist,
    headCompo
}
}
  
</script>

<style lang="scss">


</style>
