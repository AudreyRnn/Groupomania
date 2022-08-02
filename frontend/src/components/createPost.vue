<template>
  <section class="post">
    <div class="postscard create">
      <h1 class="postscard__title">Ajouter un post <fa icon="coffee" /></h1>

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
        </div>

        <input
          aria-label="image à publier"
          type="file"
          @change="fileSelected()"
          id="file"
          name="file"
          ref="file"
          accept=".jpg, .jpeg, .png"
          class="postscard__img"
        />

        <button @click="createPost()" class="button" type="submit">
          Créer Post
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "createPost",
  components: {},
  data() {
    return {
      message: "",
      imageUrl: "",
      likes: "",
      usersLiked: "",
      errorMsg: "",
    };
  },
  mounted() {
    if (localStorage.userId) {
      this.userId = localStorage.userId;
    }
    if (localStorage.username) {
      this.username = localStorage.username;
    }
  },

  methods: {
    

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
        const header = { headers: { Authorization: "Bearer " + AccessToken , } };
        
        const postForm = new FormData();
        postForm.append ("message", this.message);
        postForm.append ("image", this.file);
        postForm.append ("userId", this.userId);
        postForm.append ("likes", 0);
        postForm.apprend ("userliked", [])

        axios
          .post("http://localhost:3000/api/posts/", postForm, header)
          .then(function (response) {
            // this.$touter.push("/home");
            console.log(response);
          })
        .catch((error) => {
          console.log(error.response.data)
        })
        
      }
      else {
        this.errorMsg = "Merci d'insérer un post et une image"
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/sass/base";

.post {
  display: flex;
  justify-content: center;
  margin: 15px;
}
.create {
  border: none;
}
.button--disabled {
  background: #cecece;
  color: #ececec;
}
</style>
