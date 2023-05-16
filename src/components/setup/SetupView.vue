<template>
  <div>
    <v-progress-circular
      class="mt-10"
      v-if="postData.length === 0"
      indeterminate
      color="primary"
    />
    <Setup 
      v-for="post in postData"
      :key="post.id"
      :imagens="post.imagens"
      :created-at="post.createdAt"
      :nome="post.usuario.nome"
      :avatar="post.usuario.imagem.url"
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
}

onMounted(getSetups)

</script>
