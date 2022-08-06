<template>
<headCompo />
<div class="welcome">
<h1 class="welcome__title">Bienvenue sur le réseau social de votre entreprise! Gardez le lien avec vos collègues</h1>
</div>
<loginCompo />
<footerCompo />
</template>

<script>
import loginCompo from "@/components/loginCompo.vue";
import headCompo from "@/components/headCompo.vue";
import footerCompo from "@/components/footerCompo.vue";

export default {
    name: 'Login',
    components :{
        loginCompo,
        headCompo,
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