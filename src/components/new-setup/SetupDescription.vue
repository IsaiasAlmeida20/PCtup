<template>
  <div>
    <v-card
      v-if="!auth.getAccessToken()"
      class="bg-blue-grey-darken-4"
    >
    <v-card-item>
        <div class="text mb-1">
         Entre ou Cadastre-se
        </div>
    </v-card-item>

    <v-card-actions class="d-flex justify-center">
      <router-link to="/login">
        <v-btn 
          class="bg-deep-purple-accent-4 ma-4"
          color="white"
          elevation="10"
        >
          Entre
        </v-btn>
      </router-link>
      <router-link to="/register">
        <v-btn 
          class="bg-deep-purple-accent-4 ma-4"
          color="white"
          elevation="10"
        >
          Cadastre-se
        </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>

  <v-card
    v-else
    elevation="10"
    class="bg-blue-grey-darken-4 mt-16"
    rounded="lg"
  >
  <h1 class="text-h5 ma-4">Títlo e descrição</h1>
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
    </form>
    <v-btn
      class="bg-deep-purple-accent-4 float-end ma-4"
      @click="send"
    >
      Continuar
    </v-btn>
  </v-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import router from '@/router'
import api from '@/services/api'
import { userAuthStore } from '@/store/app'
import { SetupDescription } from './index'

const auth = userAuthStore()

const setupDescription = reactive<SetupDescription>({
  usuarioId: auth.getUserId(),
  titulo: '',
  descricao: ''
})

async function send(){
  try {
    const response = await api.post("/setups", setupDescription)
    router.push("/image")
    console.log(response.data)
    auth.setSetupId(response.data._id)
  } catch (error) {
    console.log(error)
  }
  console.log(setupDescription)
}

</script>
