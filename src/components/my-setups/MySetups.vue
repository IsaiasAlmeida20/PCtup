<template>
  <div v-if="auth.getAccessToken()">
    <v-chip
      class="mt-10"
      v-if="postData.length === 0 && loading === false"
    >
      Parece que você ainda não nos mostrou seu setup :(
    </v-chip>
    <div>
      <v-progress-circular
        class="mt-10"
        v-if="postData.length === 0 && loading === true"
        :active="loading"
        :indeterminate="loading"
        color="primary"
      />
    </div>
    <Setup 
      v-for="post in postData"
      :key="post._id"
      :setup-id="post._id"
      :user-id="post.usuarioId"
      :imagens="post.imagens"
      :created-at="formatedDate(post.createdAt)"
      :nome="post.usuario.nome"
      :avatar="post.usuario.imagem.url"
      :titulo="post.titulo"
      :descricao="post.descricao"
      :is-public="post.estaPublico"
      :favorited="isFavorite(post._id)"
      @favorite="favorite({
        setupId: post._id, 
        isFavorite: isFavorite(post._id), 
      })"
      :liked="isLike(post._id)"
      @like="like({
        setupId: post._id, 
        isLike: isLike(post._id), 
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
import { ref, reactive, onMounted } from 'vue'
import { format } from 'date-fns'
import api from '@/services/api'
import { PostType, FavoriteType, LikeType } from '@/types/comonTypes'
import { userAuthStore } from '@/store/app'
import Setup from '@/components/setup/Setup.vue'

interface favoriteProps {
  setupId: string,
  isFavorite: boolean
}

interface likeProps {
  setupId: string,
  isLike: boolean
}

const auth = userAuthStore()
const userId = auth.getUserId()

const loading = ref<boolean>(false)
const postFavoriteData = reactive<FavoriteType[]>([])
const userLikeData = reactive<LikeType[]>([])
const postData = reactive<PostType[]>([])


async function getSetups() {
  try {
    loading.value = true
    const response = await api.get<PostType[]>(`/setups/users/${userId}`)
    postData.splice(0, postData.length, ...response.data)
    loading.value = false
  } catch (error) {
    console.error(error)
  }
}

async function getSetupsFavorites() {
  try {
    const response = await api.get<FavoriteType[]>(`/favorites/users/${userId}`)
    postFavoriteData.splice(0, postFavoriteData.length, ...response.data)
  } catch (error) {
    console.error(error)
  }
}

async function favorite(props: favoriteProps) {
  try {
    if(!props.isFavorite){
        return await api.post('/favorites', {
          usuarioId: userId,
          setupId: props.setupId
        },
        {
          headers: {
            Authorization: auth.getAccessToken()
          }
        }
      ),
      getSetupsFavorites()
    }else {
      const favoriteId = idFavorite(props.setupId)
      await api.delete(`/favorites/${favoriteId}`),
      getSetupsFavorites()
    }

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

async function getUserSetupsLikes() {
  try {
    const response = await api.get<LikeType[]>(`/likes/users/${userId}`,
      {
        headers: {
          Authorization: auth.getAccessToken()
        }
      }
    )
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
          usuarioId: userId,
          setupId: props.setupId
        }, 
        {
          headers: {
            Authorization: auth.getAccessToken()
          }
        }
      ),
      getUserSetupsLikes()
    }else {
      const likeId = idLike(props.setupId)
      await api.delete(`/likes/${likeId}`),
      getUserSetupsLikes()
    }
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
  const dataFormatada = new Date(data);
  return format(dataFormatada, 'dd/MM/yyyy');
}

if(auth.getAccessToken()) {
  onMounted(getSetups)
  setTimeout(() => {
    getSetupsFavorites()
    getUserSetupsLikes()
  }, 3000)
}

</script>

<style scoped lang="css">

.link a {
  color: #FFFFFF;
}

</style>

