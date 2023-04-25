<template>
  <v-app class="bg-blue-grey-darken-3">
    <Header />
    <v-main>
      <v-container align="center">
        <div 
          class="d-flex flex-column h-100"
        >
          <div class="mb-4">
            <v-tabs
              color="blue-grey-lighten-2"
              align-tabs="center"
            >
              <v-tab :value="1">
                <v-icon icon="mdi-home-outline" size="28" title="Novo Setup"/>
                <span class="hidden-sm-and-down ms-1"> Início</span>
              </v-tab>
              <v-tab :value="2">
                <v-icon icon="mdi-image-plus-outline" size="28" title="Novo Setup"/>
                <span class="hidden-sm-and-down ms-1"> Novo Setup</span>
              </v-tab>
              <v-tab :value="3">
                <v-icon icon="mdi-star-outline" size="28" title="Favoritos"/>
                <span class="hidden-sm-and-down ms-1"> Favoritos</span>
              </v-tab>
              <v-tab :value="4">
                <v-icon icon="mdi-monitor" size="28" title="Meus Setups"/>
                <span class="hidden-sm-and-down ms-1"> Meus Setups</span>
              </v-tab>
            </v-tabs>
          </div>
          <div>
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
          
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
//import Sidebar from '@/components/Sidebar.vue'
import Post from '@/components/Post.vue'

</script>


<style lang="css" scoped>

</style>