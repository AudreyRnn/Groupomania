<template>

  <section class="posts">
    <article class="postscard" v-for="post in posts" :key="post._id">
      <!--  -->
      <header class="postscard__header">
        <div class="postscard__title">{{ post.userId }} username</div>
        <div class="postscard__time">{{ post.date }}</div>
      </header>
      <div class="postscard__body">
        <p>
          <img
            class="postscard__img"
            :src="post.imageUrl"
            alt="image postée "
          />
        </p>
        <p class="postscard__message">{{ post.message }}</p>
      </div>
      <!-- bouton like à gérer une fois icones import -->
      <footer class="postscard__footer">
        <div class="footer__like">
          <fa class="like__btn" icon="thumbs-up" /> 
          <!-- v-if="checkIfUsersLiked(post)"
            @click="likePost(post)" /> -->
          {{ post.likes }}
        </div >
        <div class="footer__ul" >
          <ul class="footernav__ul">
          <li >
            <router-link class="nav" to="/modifier">
            
              <fa v-if="userId == post.userId || this.role == 'admin'"  @click="upDatePost(post)" 
              class="footernav__btn"
               icon="pen-to-square" />
            </router-link>
          </li>
          <li>
           
              <fa v-if="userId == post.userId || this.role == 'admin'" @click="deletePost(post)" class="footernav__btn footernav__btn-delete" icon="ban" />
           
          </li>
          </ul>
        </div>
      
      </footer>
    </article>
  </section>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "postslist",
  component: {},

  data: function () {
    return {
      userId: "",
      role: "",
      username: "",
      posts: "",
      post: "",
      likes: [],
      usersliked: "",
    };
  },
mounted(){
  // this.getUserName();

  this.getAllPosts();
  this.getUserId();
  this.getIsAdmin();
  
},
computed: {
    ...mapState(["userInfos"]),
  },
  methods: {
    // // obtenir l'username depuis le LS
    // getUserName() {
    //   const user = JSON.parse(localStorage.getItem("user"));
    //   this.username = user.username;
    //   console.log(this.username);
    // },
    
    getUserId() {
      const user = JSON.parse(localStorage.getItem("user"));
      this.userId = user.userId;
      console.log(this.userId);
    },
   getIsAdmin(){
  const user= JSON.parse(localStorage.getItem("user"));
  this.role = user.role;
  console.log (this.role)
   },

    // affichage de tous les posts
    getAllPosts() {
      const user = JSON.parse(localStorage.getItem("user"));
      const AccessToken = user.token;
      const header = { headers: { Authorization: "Bearer " + AccessToken } };
      
      axios
        .get("http://localhost:3000/api/posts/", header)
        .then((response) => {
          this.posts = response.data;
          this.user = JSON.stringify(response.data.userId);
          console.log(this.posts);
        })
        .catch((error) => console.log(error));
    },
    // mofifier un post -- envoi vers la page modifier 
      upDatePost (post) {
        const IdPostToUpdate = {'postId': post._id}
        localStorage.setItem('postToUpdate',JSON.stringify(IdPostToUpdate))
        this.$router.push('/modifier')
      },
  
    // supression d'un post

    deletePost(post) {
    // demande de confirmation de la suppression du post 
  if (window.confirm ('Voulez-vous vraiment supprimer votre publication?')){
    // récupération des données dans le LS 
      const user = JSON.parse(localStorage.getItem("user"));
      const AccessToken = user.token;
     this.userId = post.userId;
      const header = { headers: { Authorization: "Bearer " + AccessToken } };
      const admin = this.role
      if (this.userId === this.post.userId || admin) {
      axios
      .delete('http://localhost:3000/api/posts/' + post._id, header)
      .then (() => {
        window.alert ('publication supprimée')
        window.location.reload()
      })
      .catch((error)=> {
        console.log(error.response.data)
      })
      } else {
        window.alert ("Vous n'êtes pas autorisé(e) à supprimer cette publication")
      }
  }

   
  },
}
}

</script>

<style scoped lang="scss">
@import "../assets/sass/base";
.button__posts {
  max-width: 300px;
}

.posts {
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
  border: solid 1px $tertiary-color;
  border-radius: 5px;
  &__header {
    padding: 10px;
  }

  &__title {
    font-weight: 700;
    margin-bottom: 5px 0;
    font-size: 18px;
  }
  &__time {
    color: rgba($color: $tertiary-color, $alpha: 0.7);
    font-size: 12px;
  }

  &__img {
    object-fit: cover;
    max-width: 600px;
    width: 100%;
    margin: 0;
  }
  &__message {
    padding: 0 10px;
  }
}
.postscard__footer {
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: space-between;
  
}
.footer__like{
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-bottom: 10px;
  
}
.like__btn{
  font-size: 20px;
}
.footernav__ul{
  display: flex;
  gap: 50px;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 20px;
}
.footernav__btn{
  color: $primary-color;
}
.footernav__btn-delete{
  cursor: pointer;
}
</style>
