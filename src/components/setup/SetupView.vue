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
      :key="post._id"
      :id="post?._id"
      :imagens="post.imagens"
      :created-at="formatedDate(post.createdAt)"
      :nome="post.usuario.nome"
      :avatar="post.usuario.imagem.url"
      :titulo="post.titulo"
      :descricao="post.descricao"
      @favorite="favorite(userId, post._id)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { format } from 'date-fns';
import api from '@/services/api'
import { userAuthStore } from '@/store/app'
import { PostType } from '@/types/comonTypes'
import Setup from './Setup.vue'

const auth = userAuthStore()

const postData = reactive<PostType[]>([])

const userId = ref<string>(auth.getUserId() || '')

async function getSetups() {
  try {
    const response = await api.get<PostType[]>('/setups');
    postData.splice(0, postData.length, ...response.data);
  } catch (error) {
    console.error(error);
  }
}

async function favorite(userId: string, setupId: string) {
  try {
    const response = await api.post('/favorites', {
      usuarioId: userId,
      setupId: setupId
    })
  } catch (error) {
    console.log(error)
  }
  
}


const formatedDate = (data: string) => {
  const dataFormatada = new Date(data);
  return format(dataFormatada, 'dd/MM/yyyy');
}

onMounted(getSetups)

</script>
