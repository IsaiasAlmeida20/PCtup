<template>
  <div>
    <div v-if="auth.getAccessToken()">
      <v-card
        elevation="10"
        class="bg-blue-grey-darken-4"
        rounded="lg"
      >
      <h1 class="text-h5 ma-4">Novo Setup</h1>
        <form 
          class="ma-4" 
        >
          <v-text-field
            label="Titulo"
            v-model="setupDescription.titulo"
            required
          />
      
          <v-textarea 
            label="Descrição"
            v-model="setupDescription.descricao"
            required
          />
          <v-file-input 
            @update:model-value="previewUrl = ''"
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
          class="bg-deep-purple-accent-4 float-end ma-4"
          :loading="loading"
          @click="send"
        >
          Salvar
        </v-btn>
      </v-card>
    </div> 

    <div v-else class="link mt-16">
      <router-link to="/login">
        Fazer Login
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import router from '@/router'
import api from '@/services/api'
import { userAuthStore } from '@/store/app'
import { SetupDescription } from '@/types/comonTypes'

const auth = userAuthStore()
const fileInput = ref<any>();
const previewUrl = ref<any>();
const loading = ref<boolean>(false)

const setupDescription = reactive<SetupDescription>({
  usuarioId: auth.getUserId(),
  titulo: '',
  descricao: ''
})

function previewImage(): void{
  const file = fileInput.value.files[0];
  const reader = new FileReader()
  reader.onload = () => {
    previewUrl.value = reader.result;
  }
  if (file) {
    reader.readAsDataURL(file)
  }
}

async function send(){
  loading.value = true
  const response = await api.post("/setups", setupDescription)
  const id = response.data._id
  if(id){
    const file = fileInput.value.files[0];
    const formData = new FormData();
    formData.append('image', file);
    api.post(`/setups/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    router.push("/")
  }
}

</script>

<style>
.link a {
  color: #FFFFFF;
}

</style>
