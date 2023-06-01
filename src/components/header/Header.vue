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
      class="pa-3 bg-deep-purple-accent-4 rounded-circle elevation-10 me-sm-16 me-8"
    >
      <router-link to="/login"  class="text-decoration-none">
        <v-icon icon="mdi-account-outline" color="white"/>
      </router-link>
    </div>
    <div
      v-else
      class=" rounded-circle elevation-10 me-sm-16 me-8"
    >
      <router-link to="/profile">
        <v-avatar size="48">
          <v-img src="https://github.com/isaiasalmeida20.png"/>
        </v-avatar>
      </router-link>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { userAuthStore } from '@/store/app'

const auth = userAuthStore()

const image = auth.getUserImg()

</script>