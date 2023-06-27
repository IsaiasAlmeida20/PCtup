<template>
  <div v-if="auth.getAccessToken()">
    <v-chip
      v-if="postData.length === 0"
    >
      Parece que você ainda não tem favoritos :(
    </v-chip>
    <div>
      <v-progress-circular
        class="mt-10 d-flex"
        v-if="postData.length === 0"
        indeterminate
        color="primary"
      />
    </div>
    <Setup 
      v-for="post in postData"
      :key="post.setup._id"
      :imagens="post.setup.imagens"
      :created-at="formatedDate(post.setup.createdAt)"
      :nome="post.setup.usuario.nome"
      :avatar="post.setup.usuario.imagem.url"
      :titulo="post.setup.titulo"
      :descricao="post.setup.descricao"
      :favorited="isFavorite(post._id)"
      @favorite="favorite(post._id)"
      :liked="isLike(post.setupId)"
      @like="like({
        setupId: post.setupId, 
        isLike: isLike(post.setupId), 
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
import { FavoriteType,LikeType } from '@/types/comonTypes'
import { userAuthStore } from '@/store/app'
import Setup from '@/components/setup/Setup.vue'

interface likeProps {
  setupId: string,
  isLike: boolean
}

const auth = userAuthStore()
const userId = auth.getUserId()

const postData = reactive<FavoriteType[]>([])
const userLikeData = reactive<LikeType[]>([])

async function getSetups() {
  try {
    const response = await api.get<FavoriteType[]>(`/favorites/users/${userId}`);
    const data =  response.data
    postData.splice(0, postData.length, ...data);
  } catch (error) {
    console.error(error);
  }
}

async function favorite(id: string) {
  try {
    await api.delete(`/favorites/${id}`),
    getSetups()
  } catch (error) {
    console.log(error)
  } 
}

function isFavorite(postId: string): boolean {
  return postId ? true : false
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
      return await api.post('/likes', {
          usuarioId: userId,
          setupId: props.setupId
        }, {
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
    getUserSetupsLikes()
  }, 3000);
}

</script>

<style scoped lang="css">

.link a {
  color: #FFFFFF;
}

</style>

