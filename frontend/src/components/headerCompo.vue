<template>
 <header class="header__main">
      <img id="logo_groupo" alt="Logo de l'entreprise Groupomania" src="../assets/Groupomania-ok.png" />
    </header>
</template>

<script>

export default {
    name:'header',
    component: {},
}
</script>

<style lang="scss">

@import '../assets/sass/base';

.header__main {
  
display: flex;
  justify-content: center;
  max-width: 100%;
  width:100%;
  background-color: $tertiary-color;
  
  & img {
    object-fit: cover;
    width: 90%;
    @include computer {
    width: 70%;
  }
  
}
}

</style>