<template>
  <div class="welcome__container">
    <h1>
      Bienvenue username, ci-dessous les publications de vos collègues. 
    </h1>
  </div>
</template>

<script>



export default {
   name: 'welcomeUser',
 
  
  
};
</script>

<style lang="scss">
@import "../assets/sass/base";

.welcome__container{
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    & h1{
        font-size: 20px;
    }
}
</style>
