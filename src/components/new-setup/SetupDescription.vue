<template>
  <div>
    <v-card
      elevation="10"
      class="bg-blue-grey-darken-4"
      height="70vh"
      rounded="lg"
    >
    <h1 class="text-h5 mb-4">Títlo e descrição</h1>
      <form class="ma-4">
        <v-text-field
          label="Titulo"
          required
        />
    
        <v-textarea 
          label="Descrição"
          required
        />
      </form>
      <v-btn
        class="bg-deep-purple-accent-4 float-end me-4"
        @click="send"
      >
        Continuar
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';

function send(): void {
  router.push("/image")
}
</script>

<style lang="css" scoped>

</style>