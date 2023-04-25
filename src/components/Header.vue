<template>
  <v-app-bar
    color="blue-grey-darken-4"
    density="default"
    justify="space-around"
  >
    <v-app-bar-title>
      <v-img
        class="ms-sm-16 me-8"
        :width="140"
        aspect-ratio="16/9"
        src="./../assets/logo.png"
      >
      </v-img>
    </v-app-bar-title>
    <div
      class="pa-3 bg-deep-purple-accent-4 rounded-circle elevation-10 me-sm-16 me-8"
    >
      <router-link to="/login"  class="text-decoration-none">
        <v-icon icon="mdi-account-outline" color="white"/>
      </router-link>
    </div>
  </v-app-bar>
</template>

<style lang="css" scoped>

</style>