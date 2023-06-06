<template>
  <div v-if="auth.getAccessToken()">
    <v-progress-circular
      class="mt-10"
      v-if="postData.length === 0"
      indeterminate
      color="primary"
    />
    <Setup 
      v-for="post in postData"
      :key="post.id"
      :id="post?.id"
      :imagens="post.imagens"
      :created-at="formatedDate(post.createdAt)"
      :nome="post.usuario.nome"
      :avatar="post.usuario.imagem.url"
      :titulo="post.titulo"
      :descricao="post.descricao"
    />
  </div>
  <div v-else class="link mt-16">
    <router-link to="/login">
      Fazer Login
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { format } from 'date-fns'
import api from '@/services/api'
import { PostType } from '@/types/comonTypes'
import { userAuthStore } from '@/store/app'
import Setup from '@/components/setup/Setup.vue'

const auth = userAuthStore()

const postData = reactive<PostType[]>([])

async function getSetups() {
  try {
    const response = await api.get<PostType[]>(`/setups/users/${auth.getUserId()}`);
    console.log(response.data)
    postData.splice(0, postData.length, ...response.data);
  } catch (error) {
    console.error(error);
  }
}

const formatedDate = (data: string) => {
  const dataFormatada = new Date(data);
  return format(dataFormatada, 'dd/MM/yyyy');
}

onMounted(getSetups)

</script>

<style scoped lang="css">

.link a {
  color: #FFFFFF;
}

</style>

