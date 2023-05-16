<template>
  <h1 class="text-h5 mb-4">Foto do Setup</h1>
  <v-card
    elevation="10"
    class="bg-blue-grey-darken-4"
    height="65vh"
    rounded="lg"
  >
    <form>
      <v-file-input 
        class="ma-4"
        type="file" 
        ref="fileInput" 
        label="Selecione uma imagem"
        prepend-icon="mdi-camera"
        @change="previewImage" 
      />
      <v-img 
        class="w-50 h-50 mb-10 rounded-lg"
        :src="previewUrl" 
      />
      <v-btn
        class="float-end me-4 bg-deep-purple-accent-4"
        v-show="previewUrl"
      >
        Concluír
      </v-btn>
    </form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileInput = ref<any>();
const previewUrl = ref<any>();

function previewImage(): void{
  const file = fileInput.value.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    previewUrl.value = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
}
</script>

<style lang="scss" scoped>

</style>