<template>
 <footer>
    <p>liens à faire </p>
    </footer>
</template>

<script>

export default {
    name:'footerCompo',
    component: {},
}
</script>

<style lang="scss">

@import '../assets/sass/base';

footer {
  
display: flex;
  justify-content: center;
  max-width: 100%;
  width:100%;
  
  
  & img {
    object-fit: cover;
    width: 90%;
    @include computer {
    width: 50%;
  }
  
}
}

</style>