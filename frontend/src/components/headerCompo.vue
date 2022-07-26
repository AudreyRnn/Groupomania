<template>
 <header>
      <img id="logo_groupo" alt="Logo de l'entreprise Groupomania" src="../assets/logo.png" />
    </header>
</template>

<script>

export default {
    name:'header',
    component: {},
}
</script>

<style lang="scss">

@import '../assets/_base.scss';

header {
  
display: flex;
  justify-content: center;
  max-width: 100%;
  width:100%;
  
  
  & img {
    object-fit: cover;
    width: 90%;
    @include computer {
    width: 55%;
  }
  
}
}

</style>