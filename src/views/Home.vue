<template>
  <v-app class="bg-blue-grey-darken-3">
    <Header />
    <v-main>
      <v-container align="center">
        <div 
          class="container d-flex flex-column h-100"
          align="center"
        >
          <div class="mb-2">
            <v-tabs
              fixed-tabs
              align-tabs="center"
            >
              <v-tab tag="router-link" to="/">
                  <v-icon icon="mdi-home-outline"  size="large" title="Novo Setup"/>
                  <span class="hidden-sm-and-down ms-1"> Início</span>
              </v-tab>
              <v-tab tag="router-link" to="/favorites">
                  <v-icon icon="mdi-star-outline"  size="large" title="Favoritos"/>
                  <span class="hidden-sm-and-down ms-1"> Favoritos</span>
              </v-tab>
              <v-tab tag="router-link" to="/my-setups">
                  <v-icon icon="mdi-monitor"  size="large" title="Meus Setups"/>
                  <span class="hidden-sm-and-down ms-1"> Meus Setups</span>
              </v-tab>
            </v-tabs>
          </div>
          <div>
            <router-view></router-view>
          </div>
          <router-link to="/new-setup">
            <v-btn 
              v-show="$route.fullPath.length==1"
              class="btn"
              size="large"
              rounded="pill"
            >
              <v-icon icon="mdi-image-plus-outline"></v-icon>
              <v-tooltip
                activator="parent"
                location="start"
              >Postar Setup</v-tooltip>
            </v-btn> 
          </router-link>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Header from '@/components/header/Header.vue';

</script>


<style lang="css" scoped>
  .container {
    width: 640px;
  }

  .container a{
    color: inherit;
    text-decoration: none;
  }
  
  @media (max-width: 1300px) {
    .container{
      width: 70%;
    }
  }

  @media (max-width: 900px) {
    .container{
      width: 80%;
    }
  }

  @media (max-width: 650px) {
    .container{
      width: 100%;
    }
  }

  .btn {
    position: fixed;
    bottom: 30px;
    right: 20px;
    z-index: 1000;
  }
</style>