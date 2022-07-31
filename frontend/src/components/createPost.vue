<template>
<section class="post__create">
    <div class="postscard postscard__create">
        <h1 class="postscard__title">Ajouter un post</h1>

        <form method="post" id="form__add">
            <div class="form-row">
                <label for="message"></label>
                <input 
                    v-model="descriptionPost.message" 
                    id="message" 
                    class="form-row__input" 
                    type="textarea"
                    placeholder="Votre message ici"
                />
            </div>

            <div class="form-row">
                <input 
                    type="file" 
                    @change=fileSelected()
                    id="image"
                    name="image"
                    ref="image" 
                    class="post-file" />
                <label for="image">
                    <span class="material-icons">add_photo_alternate</span>
                </label>

            </div>

            
        <button @click.prevent="createPost()" class="button" :class="{'button--disabled' : !validatedFields}">
          <span v-if="status == 'loading'">envoi du message...</span>
          <span v-else>Envoyer</span>
        </button>
           
        </form>

    </div>
  </section>

</template>


<script>

import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'CreatePost',
  data() {
    return {
      descriptionPost: {
        message: null,
        image: null
      },
      messagError: '',
      post: '',
      imagePost: {
        image: null
      }
    };
  },
   computed: {
    validatedFields: function () {
      if (this.post == 'createPost') {
        if (this.post != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.post == "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status', ])
  },

  methods: {
  //   onFileSelected() {
  //       this.post.image = this.$refs.image.files[0];
  //   },
  //   onUpload() {
  //       const formData = new FormData();
  //       let newDate =  Date.now();

  //       formData.append("userId", this.user.userId);
  //       formData.append("userName", this.user.userName);
  //       formData.append("description", this.post.description);
  //       formData.append("image", this.post.image);
  //       formData.append("date", newDate);

        
	// },
    createPost() {
        let dataStorage = JSON.parse(localStorage.getItem("user"));
        let token = dataStorage.token;
        let userId = dataStorage.userId;

    const formData = new FormData();
    formData.append ("message", this.descriptionPost.message);
    formData.append ("userId", userId);
    formData.append ("image", this.descriptionPost.image);

    axios
    .post ("http://localhost:3000/api/posts", formData, {
        headers:{
            Authorization: 'Bearer ' + token
        }
    })
    .then(response=> {
        if(response) {
            window.location.reload();
        }
    })
.catch (error => (this.messagError = error));
    },
fileSelected() {
    this.descriptionPost.image = this.$refs.image.files[0];
}
} 
}

</script>


<style  scoped lang="scss">
@import '../assets/sass/base';

.postscard__create{
  border:none,
}
.post__create {
display: flex;
justify-content: center;
margin: 15px;
}

</style>