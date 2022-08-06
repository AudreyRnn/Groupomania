<template>
      <header class="header__log">
      <div class="headernav">
      <img
        src="../assets/Groupomania-ok.png"
        alt="Logo Groupomania"
        class="headernav__logo"
      />
      </div>
      <div class="ul__container" v-if="this.$store.state.user.userId !== -1">
        <ul class="headernav__ul" >
          <li>
            <router-link class="nav" to="/" >
              <fa class="headernav__button" icon="house" />
            </router-link>
          </li>
           <li>
            <router-link class="nav" to="/publish" >
              <fa class="headernav__button" icon="pen-to-square" />
            </router-link>
          </li>
          <li>
            <router-link class="nav" to="/login" @click="logout">
              <fa class="headernav__button" icon="right-from-bracket" />
            </router-link>
          </li>
         
        </ul>
      </div>
    </header>
  
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "headerlog",
  components: {},
  data: function () {
    return
  },
computed: {
...mapState(['status'])
},
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
    padding-top: 5px;
     @include computer;
  @include tablet {
    padding:0;
      }
  }  
}

.headernav__ul {
    display: flex;
    text-decoration: none;
   gap:30px;

      }

  .headernav__button{
    color:$primary-color;
    height: 30px;
}
</style>
