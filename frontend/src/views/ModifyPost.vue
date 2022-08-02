<template>

<section class="modify">
<div class="modify__message">
    <textarea v-model="modifyMessage" type="text" aria-label="Modifier message"  name="modifyMessage" />
</div>
<div class="modify__file">
    <input type="file" @change="selectFile" ref="file" id="file" name="file" accept=".jpg, .jpeg, .png" aria-label="Modifier image" />
<img src=":imageUrl" alt="photo du post" class="mofify__file-img">
</div>
<footer class="mofify__footer">
<button @click="modifyPost"> Modifier</button>

</footer>



</section>
</template>

<script>


export default {
    name:'modifyPost',
    components:{}, 

}



</script>

<style>
</style>