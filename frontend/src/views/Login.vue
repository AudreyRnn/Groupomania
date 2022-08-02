<template>
<headerCompo />
<div class="welcome">
<h1 class="welcome__title">Bienvenue sur le réseau social de votre entreprise! Gardez le lien avec vos collègues</h1>
</div>
<loginCompo />
<footerCompo />
</template>

<script>
import loginCompo from "@/components/loginCompo.vue";
import headerCompo from "@/components/headerCompo.vue";
import footerCompo from "@/components/footerCompo.vue";

export default {
    name: 'Login',
    components :{
        loginCompo,
        headerCompo,
        footerCompo,
    },
};

</script>

<style lang="scss">
.welcome {
    display: flex;
    justify-content: center;
    
    &__title{ 
    font-size: 22px;
    margin:15px}
}

</style>