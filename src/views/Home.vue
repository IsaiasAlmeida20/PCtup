<template>
  <v-app class="bg-blue-grey-darken-3">
    <Header />
    <v-main>
      <v-container align="center">
        <div 
          class="container d-flex flex-column h-100"
          align="center"
        >
          <div class="mb-4">
            <v-tabs
              fixed-tabs
              align-tabs="center"
            >
              <v-tab tag="router-link" to="/">
                  <v-icon icon="mdi-home-outline"  size="large" title="Novo Setup"/>
                  <span class="hidden-sm-and-down ms-1"> Início</span>
              </v-tab>
              <v-tab tag="router-link" to="/new-setup">
                  <v-icon icon="mdi-image-plus-outline"  size="large" title="Novo Setup"/>
                  <span class="hidden-sm-and-down ms-1"> Novo Setup</span>
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
    width: 900px;
  }

  .container a{
    color: inherit;
    text-decoration: none;
  }
  
  @media (max-width: 1300px) {
    .container{
      width: 100%;
    }
  }
</style>