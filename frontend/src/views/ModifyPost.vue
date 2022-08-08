<template>
  <headCompo />
  <section class="post">
    <div class="postscard">
      <h2 class="postscard__title">Modifier votre publication</h2>

      <form method="put" id="form__add">
        <div class="form-row">
          <textarea
            aria-label="modifier message"
            v-model="post.message"
            id="message"
            class="form-row__input updateMessage"
            type="text"
            name="updateMessage"
          />

          <input
            aria-label="modifier image"
            type="file"
            @change="updateFile()"
            id="file"
            name="file"
            ref="file"
            accept=".jpg, .jpeg, .png"
            class="form-row__input"
          />
          <img :src="post.imageUrl" alt="photo du post" class="mofify__file-img" />
        </div>

        <button @click.prevent="updatePost()" class="button" type="submit">
          Modifier
        </button>
        <div v-show="errorMsg">{{ errorMsg }}</div>
      </form>
    </div>
  </section>
</template>

<script>
import headCompo from "@/components/headCompo.vue";

import axios from "axios";

export default {
  name: "modifyPost",
  components: { headCompo },

  data() {
    return {
      message: "",
      imageUrl: "",
      likes: "",
      usersLiked: [],
      errorMsg: "",
      post: "",
    };
  },
  mounted() {
    //récuperer les données dans le LS
    const user = JSON.parse(localStorage.getItem("user"));
    const AccessToken = user.token;
    const post = JSON.parse(localStorage.getItem("postToUpdate"));
    const postId = post.postId;
    const header = {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + AccessToken,
      },
    };
    //afficher le message à modifier
    axios
      .get("http://localhost:3000/api/posts/" + postId, header)
      .then((response) => {
        this.post = response.data;
      });
  },
  methods: {
    updateFile() {
      this.file = this.$refs.file.files[0];
      this.newImage = URL.createObjectURL(this.file);
    },

    UpdatePost() {
      const user = JSON.parse(localStorage.getItem("user"));
      const AccessToken = user.token;
      const post = JSON.parse(localStorage.getItem("postToUpdate"));
      const postId = post.postId;
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + AccessToken,
        },
      };
      const editPost = new FormData();
      editPost.append("userId", this.userId);
      editPost.append("message", this.post.message);
      editPost.append("likes", post.likes), editPost.append("usersLiked", []);
      editPost.append("image", this.file);

      if (this.message !== null || this.file !== null) {
        axios
          .put("http://localhost:3000/api/posts/" + postId, editPost, header)
          .then((response) => {
            window.alert("Votre publication a bien été modifiée");
            this.$router.push("/");
            console.log(response);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      } else {
        this.errorMsg = "Merci de ne laisser aucun champ vide ";
      }
    },
  },
};
</script>

<style scope lang="scss">
@import "../assets/sass/base";

.post {
  padding: 10px;
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & h2 {
    font-size: 20px;
  }
}
.postscard {
  max-width: 100%;
  width: 600px;
  img {
    object-fit: cover;
    max-width: 600px;
    width: 100%;
    margin: 0;
  }
}
.form-row {
  display: flex;
  flex-direction: column;
}
.button {
  width: 300px;
}
.button--disabled {
  background: #cecece;
  color: #ececec;
} //
</style>
