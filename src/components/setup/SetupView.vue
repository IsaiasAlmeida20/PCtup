<template>
  <div>
    <Setup 
      v-for="post in postData"
      :key="post.id"
      :imagens="post.imagens"
      :created-at="post.createdAt"
      :nome="post.usuario.nome"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import api from '@/services/api'
import { PostType } from './index'
import Setup from './Setup.vue'

const postData = reactive<PostType[]>([])

async function getSetups() {
  try {
    const response = await api.get<PostType[]>('/setups');
    postData.splice(0, postData.length, ...response.data);
  } catch (error) {
    console.error(error);
  }
  console.log(postData)
}

onMounted(getSetups)


</script>
