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
      :key="post.setup._id"
      :imagens="post.setup.imagens"
      :created-at="formatedDate(post.setup.createdAt)"
      :nome="post.setup.usuario.nome"
      :avatar="post.setup.usuario.imagem.url"
      :titulo="post.setup.titulo"
      :descricao="post.setup.descricao"
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
import { FavoriteType } from '@/types/comonTypes'
import { userAuthStore } from '@/store/app'
import Setup from '@/components/setup/Setup.vue'

const auth = userAuthStore()

const postData = reactive<FavoriteType[]>([])

async function getSetups() {
  try {
    const response = await api.get<FavoriteType[]>(`/favorites/users/${auth.getUserId()}`);
    const data =  response.data
    postData.splice(0, postData.length, ...data);
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

