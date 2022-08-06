<template>
<headCompo/>
  <section class="post">
    <div class="postscard">
      <h2 class="postscard__title">
        Modifier votre publication  
      </h2>

      <form method="post" id="form__add">
        <div class="form-row">
          <textarea
            aria-label="modifier message"
            v-model="modifyMessage"
            id="message"
            class="form-row__input updateMessage"
            type="text"
            name="updateMessage"
          />
        
        <input
          aria-label="modifier image"
          type="file"
          @change="fileSelected()"
          id="file"
          name="file"
          ref="file"
          accept=".jpg, .jpeg, .png"
          class="form-row__input"
        />
        <img src=":imageUrl" alt="photo du post" class="mofify__file-img">
        </div>

        <button @click.prevent="updatePost()" class="button" type="submit">
          Modifier 
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import headCompo from '@/components/headCompo.vue'

export default {
    name:'modifyPost',
    components:{headCompo}, 

}

</script>

<style scope lang="scss">
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
}// 


</style>