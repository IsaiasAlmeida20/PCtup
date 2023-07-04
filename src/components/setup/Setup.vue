<template>
  <v-card 
    class="bg-blue-grey-darken-4 mb-4"
    rounded="lg"
    :elevation="10"
  >       
    <v-card-item>
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex flex-row align-center">
          <v-avatar size="52" :image="avatar" class="me-4 avatar"/>
          <div class="d-flex flex-row align-center">
            <div>
              <v-card-title class="text-body-1 text-left">{{ nome  }}</v-card-title>
              <v-card-subtitle class="text-caption float-start">{{ createdAt }}</v-card-subtitle>
            </div>
          </div>
        </div>
        <div  class="float-end me-0">
          <v-card-actions>
            <div >
              <v-btn 
                v-show="!$route.fullPath.includes('/my-setups')" 
                @click="favorite"
                :loading="loadingFav"
                :color=" favorited ? 'yellow' : 'white'"
                :icon=" favorited ? 'mdi-star' : 'mdi-star-outline'"
              />
              <v-btn 
                  v-show="$route.fullPath.includes('/my-setups')" 
                  icon="mdi-pencil-outline" 
                  color="white" 
              />
              <v-dialog v-model="dialogSetup" width="300">
                  <template v-slot:activator="{ props }">
                      <v-btn 
                          v-bind="props"
                          v-show="$route.fullPath.includes('/my-setups')" 
                          icon="mdi-trash-can-outline"
                          color="white" 
                      />
                  </template>

                  <v-card color="blue-grey-darken-2" class="text-center">
                      <v-card-title class="text-body-1">Quer mesmo deletar este setup?</v-card-title>
                      <v-card-actions class="d-flex justify-center">
                          <v-btn variant="tonal" @click="dialogSetup = !deleteSetup"> Não </v-btn>
                          <v-btn variant="tonal" @click="deleteSetup(setupId), dialogSetup = !dialogSetup">
                              Sim
                          </v-btn>
                      </v-card-actions>
                  </v-card>
              </v-dialog>
            </div>
          </v-card-actions>
        </div>
      </div>
    </v-card-item>

    <v-carousel 
      show-arrows="hover"
      hide-delimiters
      height="360"
    >
      <v-carousel-item
        v-for="(image, i) in imagens"
        v-model="dialog"
        @click="dialog=true"
        :key="i"
        :src="image.url"
        cover
      ></v-carousel-item>
    </v-carousel>


    <v-card-actions class="d-flex justify-space-between">
      <div>
        <v-btn 
          @click="like"
          :loading="loadingLike"
          :color=" liked ? 'red' : 'white' "
          :prepend-icon=" liked ? 'mdi-heart' : 'mdi-heart-outline'"
        >
          <span class="text-caption text-white ms-0">{{ likes }}</span>
        </v-btn>
        <v-btn size="small" icon="mdi-comment-processing-outline" v-model="dialog" @click="dialog=true"/>
        <v-btn size="small" icon="mdi-share-variant" />
      </div>
      <div>   
          <v-dialog
              v-model="dialog"
              max-width="900"
              width="95%"
          >
              <template v-slot:activator="{ props }">
                <v-btn
                  class="text-lowercase"
                  v-bind="props"
                >
                  ver mais...  
                  <v-icon class="ms-1">mdi-information-outline</v-icon>
                </v-btn>
              </template>
              <SetupDetails 
                :setup-id="setupId"
                :nome="nome" 
                :user-id="userId"
                :created-at="createdAt"
                :avatar="avatar"
                :titulo="titulo"
                :descricao="descricao"
                :imagens="imagens"
                @close="close"
              />
          </v-dialog>
      </div>
    </v-card-actions>
  </v-card>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import api from '@/services/api';
import SetupDetails from './SetupDetails.vue';

interface props{
  setupId:string
  userId: string
  nome: string
  descricao: string
  titulo: string
  createdAt: string
  avatar: string
  favorited: boolean
  liked: boolean
  likes: any
  imagens: [
    {
      publicId: string
      url: string
    }
  ]
}

const dialog = ref<boolean>(false)
const dialogSetup = ref<boolean>(false)
const loadingFav = ref<boolean>(false)
const loadingLike = ref<boolean>(false)

const emit = defineEmits(['favorite', 'like'])

const postProps = defineProps<props>()

function close() {
  dialog.value = false
}

function favorite(){
  loadingFav.value = true
  setTimeout(() => {
    loadingFav.value = false
  },3000)
  emit('favorite')
}

function like(){
  loadingLike.value = true
  setTimeout(() => {
    loadingLike.value = false
  },2000)
  emit('like')
}

async function deleteSetup(setupId: string) {
    await api.delete(`/setups/${setupId}`)
    location.reload()
}

</script>

<style scoped lang="css">
.avatar {
  border: solid 2px #37474F;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
}
</style>
