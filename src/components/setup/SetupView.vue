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
      :liked="isLike(post._id)"
      @like="like({
        userId: post.usuarioId, 
        setupId: post._id, 
        isLike: isLike(post._id), 
      })"
    />
  </div>
</template>

<script lang="ts" setup>

import { ref, reactive, onMounted } from 'vue'
import { format } from 'date-fns';
import api from '@/services/api'
import { userAuthStore } from '@/store/app'
import { PostType, FavoriteType, LikeType } from '@/types/comonTypes'
import Setup from './Setup.vue'

interface favoriteProps {
  userId: string, 
  setupId: string,
  isFavorite: boolean
}

interface likeProps {
  userId: string, 
  setupId: string,
  isLike: boolean
}

const auth = userAuthStore()
const postData = reactive<PostType[]>([])
const postFavoriteData = reactive<FavoriteType[]>([])
const userLikeData = reactive<LikeType[]>([])
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
    const response = await api.get<FavoriteType[]>(`/favorites/users/${userId.value}`)
    postFavoriteData.splice(0, postFavoriteData.length, ...response.data)
  } catch (error) {
    console.error(error)
  }
}

async function favorite(props: favoriteProps) {
  try {
    if(!props.isFavorite){
      console.log(props.isFavorite)
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

//################################# LIKESSS


async function getUserSetupsLikes() {
  try {
    const response = await api.get<LikeType[]>(`/likes/users/${userId.value}`)
    console.log(response.data)
    userLikeData.splice(0, userLikeData.length, ...response.data)
  } catch (error) {
    console.error(error)
  }
}

async function like(props: likeProps) {
  try {
    if(!props.isLike){
      console.log(props.isLike)
      return await api.post('/likes', {
        "usuarioId": props.userId,
        "setupId": props.setupId
      })
    }

    const likeId = idLike(props.setupId)

    await api.delete(`/likes/${likeId}`)
  } catch (error) {
    console.log(error)
  } 
}

function isLike(postId: string): boolean {
  return userLikeData.some(like => postId === like.setupId)
}

function idLike(postId: string) {
  for (const like of userLikeData) {
    if(postId === like.setupId) {
      return like._id
    }
  }
}

const formatedDate = (data: string) => {
  const dataFormatada = new Date(data)
  return format(dataFormatada, 'dd/MM/yyyy')
}

onMounted(getSetups)

if (auth.getAccessToken()) {
  setTimeout(() => {
    getSetupsFavorites()
    getUserSetupsLikes()
  }, 3000)
}


</script>
