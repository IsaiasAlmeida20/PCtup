<template>
    <div>
        <v-card 
            elevation="10" 
            class="bg-blue-grey-darken-4" 
            rounded="lg"
            @vnode-mounted="getSetup(store.setupId!)"
        >
            <div>
                
                <h1 class="text-h5 ma-4">Editar Setup</h1>
                <v-form @submit.prevent="send(store.setupId!)" class="ma-4">
                    <v-switch 
                        color="blue"
                        :label="setupDescription.estaPublico ? 'Remover publico' : 'Tornar publico'">
                        v-model="setupDescription.estaPublico"
                        @click="setupDescription.estaPublico = !setupDescription.estaPublico"
                    </v-switch>
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
                        label="Adicione uma nova imagem" 
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
                    <h3 class="ma-4" v-if="store.setupId">Fotos do setup</h3>
                    <v-row>
                        <v-col
                        v-for="img in postData?.imagens"
                        :key="img.publicId"
                        class="d-flex child-flex"
                        cols="4"
                        >
                            <v-img
                                :src="img.url"
                                aspect-ratio="1"
                                cover
                                class="bg-grey-lighten-2 rounded-lg "
                            >
                                <v-dialog v-model="dialog" width="400">
                                    <template v-slot:activator="{ props }">
                                        <v-btn 
                                            v-bind="props"
                                            class="btn" 
                                            elevation="0" 
                                            size="small" 
                                            icon="mdi-trash-can" 
                                            color="transparent"
                                        />
                                    </template>

                                    <v-card color="blue-grey-darken-2" class="d-flex align-center">
                                        <v-card-title class="text-body-1">Quer mesmo deletar essa imagem? {{img.publicId}}</v-card-title>
                                        <v-card-actions class="text-center">
                                            <v-btn variant="tonal" @click="dialog = !dialog"> Não </v-btn>
                                            <v-btn variant="tonal" @click="deletImg(img.publicId),dialog = !dialog">
                                                Sim
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                
                            </v-img>
                        </v-col>
                    </v-row>
                    <div>
                        <v-btn 
                            class="bg-deep-purple-accent-4 float-end ma-4" 
                            :loading="loading" 
                            type="submit"
                        >
                            Salvar
                        </v-btn>
                        <router-link to="/my-setups">
                            <v-btn 
                                class="bg-orange-lighten-3 float-end ma-4" 
                            >
                                Cancelar
                            </v-btn>
                        </router-link>
                    </div>
                </v-form>
            </div>
        </v-card>
        <v-snackbar
            v-model="snackbar"
            :timeout="6000"
            color="blue-grey"
        >
            Seu setup foi atualizado com sucesso!
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
</template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue'
import api from '@/services/api'
import router from '@/router'
import { setupStore } from '@/store/setupStore'
import { SetupEdit, SetupDescription } from '@/types/comonTypes'

const store = setupStore()
const fileInput = ref<any>();
const files = ref<any[]>([]);
const previewUrl = ref<any>();
const loading = ref<boolean>(false)
const dialog = ref<boolean>(false)
const snackbar = ref<boolean>(false)
const postData = ref<SetupEdit>()
const imagens = ref<any[]>([])

const setupDescription = reactive<SetupDescription>({
    titulo: '',
    descricao: '',
    estaPublico: true
})

async function getSetup(setupId: string) {
  try {
    const response = await api.get<SetupEdit>(`/setups/${setupId}`)
    postData.value = response.data
    const {data: setup} = response

    Object.assign(setupDescription, setup)
    console.log(postData.value)
  } catch (error) {
    console.error(error)
  }
}

function removeItem(index: any){
  files.value.splice(index, 1);
  imagens.value.splice(index, 1);
}

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
async function send(setupId: string) {
    loading.value = true
    await api.put(`/setups/${setupId}`, {
        titulo: setupDescription.titulo,
        descricao: setupDescription.descricao,
    })
    snackbar.value = true
    for (const file of files.value) {
      const formData = new FormData();
      formData.set('image', file);
      api.post(`/setups/${setupId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
    loading.value = false
    setTimeout(() => {
        location.reload
        router.push("/my-setups")
    }, 6000)
}

async function deletImg(publicId: string) {
    try {
        await api.delete(`/setups/${store.setupId}/images?publicId=${publicId}`)
        getSetup(store.setupId!)
    } catch (error) {
        console.log(error)
    }
}

function pro() {
    console.log(setupDescription.estaPublico)
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
  