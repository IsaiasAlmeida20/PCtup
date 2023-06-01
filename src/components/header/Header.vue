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
        <v-avatar :image="userData?.imagem.url" size="48"></v-avatar>
      </router-link>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { onMounted } from 'vue';
import api from '@/services/api';
import { userAuthStore } from '@/store/app'
import { UserType } from '@/types/comonTypes'

const auth = userAuthStore()

const userData = ref<UserType>()

async function getUserData() {
  const userId = auth.getUserId()
  try {
    const response = await api.get(`/users/${userId}`)
    userData.value = response.data
    console.log(userData)
    return response
  } catch (error) {
    console.log(error)
  }
}

setTimeout(() => {
  if(auth.getAccessToken()) {
    getUserData()
  }
}, 5000)


</script>