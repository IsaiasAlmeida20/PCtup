<template>
  <v-card 
    class="container bg-blue-grey-darken-4" 
    rounded="lg"
  >
    <v-col class="py-8">
      <v-row>
        <button class="btn bg-deep-purple-accent-4 mx-auto">
          <v-icon icon="mdi-home-outline" size="30"/>
          Inicio
        </button>
      </v-row>
      <v-row>
        <button class="btn bg-blue-grey-darken-3 mx-auto">
          <v-icon icon="mdi-plus-box-multiple-outline" size="30"/>
          Novo Setup
        </button>
      </v-row>
      <v-row>
        <button class="btn bg-blue-grey-darken-3 mx-auto">
          <v-icon icon="mdi-star-outline" size="30"/>
          Favoritos
        </button>
      </v-row>
      <v-row>
        <button class="btn bg-blue-grey-darken-3 mx-auto">
          <v-icon icon="mdi-desktop-tower-monitor" size="30"/>
          Meus setups
        </button>
      </v-row>
      <v-row>
        <button class="btn bg-blue-grey-darken-3 mx-auto">
          <v-icon icon="mdi-logout" size="30"/>
          Sair
        </button>
      </v-row>
    </v-col>    
  </v-card>
</template>

<script setup>

</script>

<style lang="css" scoped>

.container {
  max-width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.btn {
  display: flex;
  align-items: center;
  padding-left: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4));
  margin: 10px;
  font-weight: 400;
  font-size: 1.6rem;
  width: 90%;
  height: 3.625rem;
  border: none;
  border-radius: 8px;
}
</style>