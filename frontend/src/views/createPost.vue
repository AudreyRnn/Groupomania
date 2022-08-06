<template>
<headCompo />
  <section class="post">
    <div class="postscard">
      <h2 class="postscard__title">
        Creez votre publication 
      </h2>

      <form method="post" id="form__add">
        <div class="form-row">
          <textarea
            aria-label="message de l'utilisateur"
            v-model="message"
            id="message"
            class="form-row__input"
            type="text"
            placeholder="Votre message ici"
          />
        
        
        <input
          aria-label="image à publier"
          type="file"
          @change="fileSelected()"
          id="file"
          name="file"
          ref="file"
          accept=".jpg, .jpeg, .png"
          class="form-row__input"
        />
        </div>

        <button @click.prevent="createPost()" class="button" type="submit">
          Publier
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import headCompo from "@/components/headCompo.vue";

import { mapState } from "vuex";

export default {
  name: "createPost",
  components: {headCompo},
  data() {
    return {
      message: "",
      imageUrl: "",
      likes: "",
      usersLiked: "",
      username: "",
      errorMsg: "",
    };
  },

  // récupérer les données dans le localstrorage
  // mounted() {
  //   if (JSON.parse(localStorage.getItem ("user")).userId) {
  //     this.userId = JSON.parse(localStorage.getItem ("user")).userId;
  //   }
  //   if (JSON.parse(localStorage.getItem ("user")).username) {
  //     this.username = JSON.parse(localStorage.getItem ("user")).username;
  //   }
  // },
  mounted() {
    this.getUserId();
    // this.getUserName();
  },
  computed: {
    ...mapState(["userInfos"]),
  },

  methods: {
    // obtenir l'username depuis le LS
    getUserName() {
      const user = JSON.parse(localStorage.getItem("user"));
      this.username = user.username;
      console.log(this.username);
    },
    //obtenir l'user Id depuis le LS
    getUserId() {
      const user = JSON.parse(localStorage.getItem("user"));
      this.userId = user.userId;
      console.log(this.userId);
    },

    fileSelected() {
      this.file = this.$refs.file.files[0];
      this.newImage = URL.createObjectURL(this.file);
    },

    createPost() {
      if (this.message !== "") {
        console.log("champ completé");
        this.errorMsg = "";

        const user = JSON.parse(localStorage.getItem("user"));
        const AccessToken = user.token;
        const header = {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + AccessToken,
          },
        };
        console.log(this.message);
        console.log(this.userId);
        console.log(this.file);

        const postForm = new FormData();
        postForm.append("userId", this.userId);
        postForm.append("message", this.message);
        postForm.append("like", 0);
        postForm.append("usersLiked", []);
        postForm.append("image", this.file);

        axios
          .post("http://localhost:3000/api/posts/", postForm, header)
          .then(function (response) {
            this.$touter.push("/");
            console.log(response);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      } else {
        this.errorMsg = "Merci d'insérer un post et une image";
      }
    },
  },
};
</script>

<style lang="scss">
@import "../assets/sass/base";

.post {
  display: flex;
  justify-content: center;
  margin: 10px;
}
.postscard {
  max-width: 100%;
  width: 600px;
}
.form-row{
  display: flex;
  flex-direction: column;
}
.button{
  width:300px;
  
}
.button--disabled {
  background: #cecece;
  color: #ececec;
}
</style>



