<template>
  <div>
    <v-card
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
  titulo: '',
  descricao: '',
  usuarioId: auth.getUserId()
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
