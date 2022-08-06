<template>
<headCompo />
 <welcomeUser />
  <postslist />
</template>

<script>
import postslist from "@/components/postslist.vue";
import welcomeUser from "@/components/welcomeUser.vue";
import headCompo from "@/components/headCompo.vue";


export default {
  name: "Home",
  // beforeCreate: function () {
  //   if (localStorage.getItem("user") == null || this.$store.state.user.userId == -1) {
  //     this.$router.push('/login');
  //   }
  //   return;
  // },
  components: {
    postslist,
    headCompo,
    welcomeUser,
  },
};
</script>

<style lang="scss">


</style>


