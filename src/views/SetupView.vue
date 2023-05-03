<template>
  <div>
<!--     <Setup
      v-for="(post, i) in postData"
      :key="i"
      :created-at="post.createdAt"
      :images="post.imagens.url"
      :user-name="post.usuario.nome"
    /> -->
    
  </div>
</template>

<script lang="ts" setup>

//import Setup from '@/components/setup/Setup.vue'
import api from '@/services/api'
import { ref, onMounted } from 'vue'


const postData = ref([])


async function getSetups() {
  await api
    .get("/setups")
    .then((response) => {

      postData.value = response.data
      console.log('asdjad', postData.value)


    })
}

onMounted(getSetups)


</script>
