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
      class="d-flex justify-center elevation-0 me-sm-16 me-8"
    >
      <div  class="d-flex flex-column align-end me-2">
        <h4>Olá, {{ userData?.nome }}</h4>
        <h6 class="sair text-caption text-deep-purple-accent-1" @click="sair">Sair</h6>
      </div>
      <router-link to="/profile">
          <v-avatar 
            class="avatar"
            :image="userData?.imagem.url ? userData?.imagem.url : ''" 
            size="44"
          ></v-avatar>
      </router-link>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '@/services/api';
import { UserType } from '@/types/comonTypes';
import { userAuthStore } from '@/store/app'
import router from '@/router';

const auth = userAuthStore()

let userData = ref<UserType>()

async function getUserData() {
  const userId = auth.getUserId()
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: auth.getAccessToken()
      }
    })
    userData.value = response.data
    localStorage.setItem('userImg', response.data.imagem.url)
    return response
  } catch (error) {
    console.log(error)
  }
}

function sair() {
    auth.setAcessToken('')
    auth.setUserId('')
    router.push("/")
    location.reload()
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

.sair {
  cursor: pointer;
  transition: .9s;
}

.sair:hover {
  text-decoration: underline;
}
</style>