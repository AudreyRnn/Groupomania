<template>
      <header class="header__log">
      <div class="headernav">
      <img
        src="../assets/Groupomania-ok.png"
        alt="Logo Groupomania"
        class="headernav__logo"
      />
      </div>
      <div class="ul__container">
        <ul class="headernav__ul">
          <li>
            <router-link class="nav" to="/login" @click="logout">
              <fa class="headernav__button" icon="right-from-bracket" />
            </router-link>
          </li>
          <li>
            <router-link class="nav" to="/modifier" >
              <fa class="headernav__button" icon="coffee" />
            </router-link>
          </li>
        </ul>
      </div>
    </header>
  
</template>

<script>
export default {
  name: "headerlog",
  components: {},

  methods: {
    logout: function () {
      this.$store.commit("logout");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/base";
.header__log {
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  align-items:center;
  height: 110px;
  background-color: $tertiary-color;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @include computer;
  @include tablet {
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
      }
}
.headernav {
  display: flex;
  align-items: center;
  justify-content: center;
  
  &__logo {
    width: 250px;
    padding-top: 10px;
     @include computer;
  @include tablet {
    padding:0;
      }
  }  
}

.headernav__ul {
    display: flex;
    text-decoration: none;
   gap:50px;
   padding-bottom: 20px; @include computer;
  @include tablet {
    padding:0;
      }
      }

  .headernav__button{
    color: #FD2D01;
    height: 30px;
}
</style>
