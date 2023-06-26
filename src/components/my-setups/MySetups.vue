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
      :key="post._id"
      :imagens="post.imagens"
      :created-at="formatedDate(post.createdAt)"
      :nome="post.usuario.nome"
      :avatar="post.usuario.imagem.url"
      :titulo="post.titulo"
      :descricao="post.descricao"
      :favorited="isFavorite(post._id)"
      @favorite="favorite({
        userId: post.usuarioId, 
        setupId: post._id, 
        isFavorite: isFavorite(post._id), 
      })"
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
import { PostType, FavoriteType } from '@/types/comonTypes'
import { userAuthStore } from '@/store/app'
import Setup from '@/components/setup/Setup.vue'

interface favoriteProps {
  userId: string, 
  setupId: string,
  isFavorite: boolean
}

const auth = userAuthStore()

const postFavoriteData = reactive<FavoriteType[]>([])
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

async function getSetupsFavorites() {
  try {
    const response = await api.get<FavoriteType[]>(`/favorites/users/${auth.getUserId()}`)
    postFavoriteData.splice(0, postFavoriteData.length, ...response.data)
  } catch (error) {
    console.error(error)
  }
}

async function favorite(props: favoriteProps) {
  try {
    if(!props.isFavorite){
      return await api.post('/favorites', {
        usuarioId: props.userId,
        setupId: props.setupId
      })
    }

    const favoriteId = idFavorite(props.setupId)

    await api.delete(`/favorites/${favoriteId}`)
  } catch (error) {
    console.log(error)
  } 
}

function isFavorite(postId: string): boolean {
  return postFavoriteData.some(favorite => postId === favorite.setupId)
}

function idFavorite(postId: string) {
  for (const post of postFavoriteData) {
    if(postId === post.setupId) {
      return post._id
    }
  }
}

const formatedDate = (data: string) => {
  const dataFormatada = new Date(data);
  return format(dataFormatada, 'dd/MM/yyyy');
}

if(auth.getAccessToken()) {
  onMounted(getSetups)
  getSetupsFavorites()
}

</script>

<style scoped lang="css">

.link a {
  color: #FFFFFF;
}

</style>

