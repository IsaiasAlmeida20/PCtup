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
      :favorited="isFavorite(post._id)"
      @favorite="favorite({
        userId: post.usuarioId, 
        setupId: post._id, 
        isFavorite: isFavorite(post._id), 
      })"
    />
  </div>
</template>

<script lang="ts" setup>

import { ref, reactive, onMounted } from 'vue'
import { format } from 'date-fns';
import api from '@/services/api'
import { userAuthStore } from '@/store/app'
import { PostType, FavoriteType } from '@/types/comonTypes'
import Setup from './Setup.vue'

interface favoriteProps {
  userId: string, 
  setupId: string,
  isFavorite: boolean
}

const auth = userAuthStore()
const postData = reactive<PostType[]>([])
const postFavoriteData = reactive<FavoriteType[]>([])
const userId = ref<string>(auth.getUserId() || '')

async function getSetups() {
  try {
    const response = await api.get<PostType[]>('/setups')
    postData.splice(0, postData.length, ...response.data)
  } catch (error) {
    console.error(error)
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
    console.log('f', favoriteId)

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
  const dataFormatada = new Date(data)
  return format(dataFormatada, 'dd/MM/yyyy')
}

onMounted(getSetups)

if (auth.getAccessToken()) {
  getSetupsFavorites()
}


</script>
