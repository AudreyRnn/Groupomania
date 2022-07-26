<template>
<div class="connexion">
  <div class="card">
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p class="card__subtitle" v-if="mode == 'login'"> Vous n'êtes pas encore inscrit ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
    <p class="card__subtitle" v-else>Vous avez déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="text" placeholder="prenom.nom@groupomania.com"/>
    </div>
    <div class="form-row" v-if="mode == 'create'">
    
      <input v-model="username" class="form-row__input" type="text" placeholder="Nom d'utilisateur "/>
    </div>
    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div>
    <div class="form-row">
      <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'

export default {
  name: 'loginCompo',
  data: function () {
    return {
      mode: 'login',
      email: '',
      password: '',
      username: '',
    }
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push('/');
      return ;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.username != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status'])
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then(function () {
        self.$router.push('/');
      }, function (error) {
        console.log(error);
      })
    },
    createAccount: function () {
      const self = this;
      this.$store.dispatch('createAccount', {
        email: this.email,
        username: this.username,
        password: this.password,
      }).then(function () {
        self.login();
      }, function (error) {
        console.log(error);
      })
    },
  }
}
</script>

<style lang="scss">

@import '../assets/_base.scss';

.connexion {
  display: flex;
  justify-content: center;
  margin:15px;
  
}

.form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
    &__input {
    padding:8px;
    border: none;
    border-radius: 12px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: $tertiary-color;
  }
  }
  .form-row__input::placeholder {
    color:#aaaaaa;
  }

.card {
  max-width: 100%;
  width: 540px;
  background:white;
  border-radius: 16px;
  padding:25px;
    
  &__title {
  text-align:center;
  font-weight: 700;
  color: $tertiary-color;
}
&__subtitle {
  text-align: center;
  color:$tertiary-color;
  font-weight: 600;
  font-style: italic;
  font-size:16px
} 
&__action {
    color:#2196F3;
    text-decoration: underline;
  }
}
 .card__action:hover {
    cursor:pointer;
  }

  .button {
    background: $primary-color;
    color:white;
    border-radius: 15px;
    font-weight: 800;
    font-size: 16px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;

    :hover {
    cursor:pointer;
    background:$primary-color;
  }
  }
 
  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }

</style>>