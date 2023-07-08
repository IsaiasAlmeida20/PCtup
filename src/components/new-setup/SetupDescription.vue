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
            @update:model-value="previewUrl!"
            type="file" 
            ref="fileInput" 
            label="Selecione as imagens do setup (uma por vez)"
            prepend-icon="mdi-camera"
            @change="previewImage" 
          />
          <v-row>
            <v-col
              v-for="(img, i) in imagens"
              :key="i"
              class="d-flex child-flex"
              cols="4"
              >
                  <v-img
                      :src="img"
                      aspect-ratio="1"
                      cover
                      class="bg-grey-lighten-2 rounded-lg "
                  >
                  <v-btn 
                      class="btn" 
                      elevation="0" 
                      size="small" 
                      icon="mdi-trash-can" 
                      color="transparent"
                      @click="removeItem(i)"
                  />
                  </v-img>
            </v-col>
          </v-row>
        </form>
        <v-btn
          class="bg-deep-purple-accent-4 float-end ma-4"
          :loading="loading"
          @click="send"
        >
          Salvar
        </v-btn>
      </v-card>
      <v-snackbar
        v-model="snackbar"
        :timeout="6000"
        color="blue-grey"
      >
        Seu setup foi postado com sucesso!
        Aguarde até que um dos administradores aprovem seu post.
        Enquanto isso podera vê-lo em meus setups.
        <template v-slot:actions>
          <v-btn
            color="blue"
            variant="text"
            icon="mdi-close"
            @click="snackbar = false"
          />
        </template>
      </v-snackbar>
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
const files = ref<any[]>([]);
const previewUrl = ref<any>();
const loading = ref<boolean>(false)
const snackbar = ref<boolean>(false)
const imagens = ref<any[]>([])

const setupDescription = reactive<SetupDescription>({
  usuarioId: auth.getUserId(),
  titulo: '',
  descricao: ''
})

function removeItem(index: any){
  files.value.splice(index, 1);
  imagens.value.splice(index, 1);
};

function previewImage(): void{
  const file = fileInput.value.files[0];
  files.value.push(file)
  const reader = new FileReader()
  reader.onload = () => {
    previewUrl.value = reader.result;
    imagens.value.push(previewUrl.value)
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
    snackbar.value = true
    for (const file of files.value) {
      const formData = new FormData();
      formData.set('image', file);
      api.post(`/setups/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
    loading.value = false
    setTimeout(() => {
      router.push("/")
    }, 6000)
  }
}

</script>

<style scoped lang="css">
.link a {
  color: #FFFFFF;
}

.btn {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
}

</style>

