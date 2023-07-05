<template>
    <div>
        <v-card 
            elevation="10" 
            class="bg-blue-grey-darken-4" 
            rounded="lg"
            @vnode-mounted="getSetups()"
        >
            <div>
                
                <h1 class="text-h5 ma-4">Editar Setup</h1>
                <v-form @submit.prevent="send" class="ma-4">
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
                    <v-img class="w-75 mb-10 rounded-lg" :src="previewUrl" />
                    <v-btn 
                        class="bg-deep-purple-accent-4 
                        float-end ma-4" 
                        :loading="loading" 
                        type="submit"
                    >
                        Salvar
                    </v-btn>
                </v-form>
            </div>
        </v-card>
    </div>
</template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue'
import router from '@/router'
import api from '@/services/api'
import { userAuthStore } from '@/store/app'
import { PostType, SetupDescription } from '@/types/comonTypes'

const auth = userAuthStore()
const fileInput = ref<any>();
const previewUrl = ref<any>();
const loading = ref<boolean>(false)
const postData = reactive<PostType[]>([])
const userId = auth.getUserId()

const setupDescription = reactive<SetupDescription>({
    titulo: '',
    descricao: ''
})

async function getSetups() {
  try {
    const response = await api.get<PostType[]>(`/setups/users/${userId}`)
    console.log(response.data)
    postData.splice(0, postData.length, ...response.data)
  } catch (error) {
    console.error(error)
  }
}

function previewImage(): void {
    const file = fileInput.value.files[0];
    const reader = new FileReader()
    reader.onload = () => {
        previewUrl.value = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file)
    }
}

async function send() {
    loading.value = true
    console.log(setupDescription)
    loading.value = false
}

</script>
  
<style>
.link a {
    color: #FFFFFF;
}
</style>
  