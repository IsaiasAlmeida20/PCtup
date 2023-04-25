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
              color="blue-grey-lighten-2"
              align-tabs="center"
            >
              <v-tab :value="1">
                <router-link to="">
                  <v-icon icon="mdi-home-outline"  size="large" title="Novo Setup"/>
                  <span class="hidden-sm-and-down ms-1"> Início</span>
                </router-link>
              </v-tab>
              <v-tab :value="2">
                <router-link to="/new-setup">
                  <v-icon icon="mdi-image-plus-outline"  size="large" title="Novo Setup"/>
                  <span class="hidden-sm-and-down ms-1"> Novo Setup</span>
                </router-link>
              </v-tab>
              <v-tab :value="3">
                <router-link to="/favorites">
                  <v-icon icon="mdi-star-outline"  size="large" title="Favoritos"/>
                  <span class="hidden-sm-and-down ms-1"> Favoritos</span>
                </router-link>
              </v-tab>
              <v-tab :value="4">
                <router-link to="/my-setups">
                  <v-icon icon="mdi-monitor"  size="large" title="Meus Setups"/>
                  <span class="hidden-sm-and-down ms-1"> Meus Setups</span>
                </router-link>
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
import Header from '@/components/Header.vue';

</script>


<style lang="css" scoped>
  .container {
    width: 1200px;
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