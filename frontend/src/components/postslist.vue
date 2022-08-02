<template>
  <section class="posts">
    <button @click="getAllPosts()" class="button button__posts">
          Afficher les posts de vos collègues
        </button>
    <article  class="postscard" v-for="post in posts" :key="post._id">
      <!--  -->
        <header class="postscard__header">
            <div class="postscard__title">{{ post.username }}</div>
            <div class="postscard__time">{{ post.date}}</div>
        </header>
        <div class="postscard__body">
           <p> <img class="postscard__img " :src="post.imageUrl" alt="image postée " /></p>
            <p class="postscard__message">{{ post.message }} </p>
        </div>
        <!-- bouton like à gérer une fois icones import -->
      <footer class = "postscard__footer">
                 
    <div class="postscard__footer_like"> <fa icon="thumbs-up"/> <!-- v-if="checkIfUsersLiked(post)"
            @click="likePost(post)" /> -->{{post.likes}}</div>

    <!-- si user ok ou user admin proposer modification du post -->
      <div class="icon" v-if="userId == post.userId || isAdmin" >
      <!--<router-link>
        router link à créer pour edit/modifier delete post 
      </div>router-link-->
    </div>
    </footer>
    </article>

  </section>
</template>

<script>

import axios from 'axios';

export default {
    name:'postslist',
    component: {},

    data: function() {
    return {
      userId:'',
      isAdmin:'',
      username:'',
      posts:'',
      post:'',
      likes: '',
    };
},

methods: {
  // obtenir l'username depuis le LS 
  getUserName(){
    const user = JSON.parse(localStorage.getItem('user'));
    this.username = user.username;
  },
 //obtenir l'user Id depuis le LS 
 getUserId() {
  const user = JSON.parse(localStorage.getItem ('user'));
  this.userId = user.userId
 },

 getAllPosts() {
      const user = JSON.parse(localStorage.getItem('user'));
      const AccessToken = user.token;
      // eslint-disable-next-line prefer-template
      const header = { headers: { Authorization: 'Bearer ' + AccessToken } };
      // eslint-disable-next-line  prefer-template
      axios
        .get('http://localhost:3000/api/posts/', header)
        .then((response) => {
          
          this.posts = response.data;
          this.user = JSON.stringify(response.data.userId);
          console.log(this.posts);
        })
        .catch((error) => console.log(error));
    },

    
}
}

</script>

<style scoped lang="scss">
@import '../assets/sass/base';

.posts {
  padding:10px;
  display: flex;
  gap:30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 

}
.postscard{
max-width: 100%;
width:600px;
border: solid 1px $tertiary-color;
border-radius: 5px;
&__header{
  padding:10px;
  }

&__title {
   font-weight: 700;
  margin-bottom: 5px 0;
font-size: 18px;
}
&__time
{
color: rgba($color: $tertiary-color, $alpha: 0.70);
font-size: 12px;
}
&__img{
  object-fit: cover;
  max-width: 600px;
  width:100%;
  margin:0;
}
&__message {
  padding:0 10px;
}
}
.button__posts{
  max-width: 300px;
}


    </style>

