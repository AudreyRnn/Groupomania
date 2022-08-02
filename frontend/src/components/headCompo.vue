<template>
<div>
  <header class="header__log">
    <div class="headernav">
        <img src="../assets/Groupomania-ok.png" alt="Logo Groupomania"
        class="headernav__logo">
            <button id="logout__button"
       class="headernav__button"
      @click.prevent="Logout()">
        <fa icon="right-from-bracket"/>
      </button>
    </div>
  </header>
</div>
</template>

<script>

export default {
    name:'headerlog',
  components: {
    
  },

  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/base';
.header__log{
  background-color: $tertiary-color;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @include computer; @include tablet {
    display:flex;
    justify-content:center;
  }
  }
.headernav{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:center;

  &__logo{
    width: 180px ;
    margin: 10px;
  }
  &__button{
    margin-right: 10px;
    color: #FD2D01;
    border-radius: 5px;
    height: 30px;
    width: 30px;
  }
}
nav {
  padding: 30px;
  color: #FD2D01;
  text-decoration: none;
}

nav a {
  font-weight: bold;
  color: #FFFF;
  text-decoration: none;
  padding: 10px 40px;
}

nav a.router-link-exact-active {
  color: #FD2D01;
  background-color: #FFFF;
  border-radius: 5px;
}
</style>