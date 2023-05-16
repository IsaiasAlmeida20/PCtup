<template>
  <v-card
    elevation="10"
    class="bg-blue-grey-darken-4 mt-16"
    rounded="lg"
    max-height="70%"
  >
    <h1 class="text-h5 ma-4">Foto do Setup</h1>

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
        class="w-75 mb-10 rounded-lg"
        :src="previewUrl" 
      />
    </form>
    <v-btn
      class="float-end me-4 bg-deep-purple-accent-4 mb-4 me-4"
      v-show="previewUrl"
      @click="sendImg"
    >
      Concluír
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/services/api';
import { userAuthStore } from '@/store/app'
import router from '@/router';

const auth = userAuthStore()

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

async function sendImg() {
  const file = fileInput.value.files[0];
  const formData = new FormData();
  formData.append('image', file);
  try {
    const response = await api.post(`/setups/${auth.getSetupId()}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    router.push("/")
  } catch (error) {
    console.log(error)
  }

  console.log(file.name)
}
</script>

<style lang="scss" scoped>

</style>