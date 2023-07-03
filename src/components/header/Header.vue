<template>
  <v-app-bar
    color="blue-grey-darken-4"
    density="default"
    justify="space-around"
  >
    <v-app-bar-title>
      <router-link to="/">
        <v-img
          class="ms-sm-16 me-8"
          :width="140"
          aspect-ratio="16/9"
          src="@/assets/logo.png"
        />
      </router-link>
    </v-app-bar-title>
    <div
      v-if="!auth.getAccessToken()"
      class="pa-3 bg-deep-purple-accent-4 rounded-circle elevation-1 me-sm-16 me-8"
    >
      <router-link to="/login"  class="text-decoration-none">
        <v-icon icon="mdi-account-outline" color="white"/>
      </router-link>
    </div>
    <div
      v-else
      class=" rounded-circle elevation-1 me-sm-16 me-8"
    >
      <router-link to="/profile">
        <v-avatar 
          class="avatar"
          :image="userImg ? userImg : ''" 
          size="44"
        ></v-avatar>
      </router-link>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '@/services/api';
import { userAuthStore } from '@/store/app'

const auth = userAuthStore()

const userImg = ref(localStorage.getItem('userImg'))

async function getUserData() {
  const userId = auth.getUserId()
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: auth.getAccessToken()
      }
    })
    localStorage.setItem('userImg', response.data.imagem.url)
    return response
  } catch (error) {
    console.log(error)
  }
}


if(auth.getAccessToken() && auth.getUserId()) {
  getUserData()
}

</script>

<style scoped lang="css">
.avatar {
  border: solid 2px #37474F;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
}
</style>