<template>
<headerCompo />
<loginCompo />

</template>

<script>
import loginCompo from "@/components/loginCompo.vue";
import headerCompo from "@/components/headerCompo.vue";

export default {
    name: 'Login',
    components :{
        loginCompo,
        headerCompo,
    },
};

</script>

<style lang="scss">


</style>