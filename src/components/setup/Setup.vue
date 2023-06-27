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
            <div>
              <v-btn 
                @click="favorite"
                :loading="loadingFav"
                :color=" favorited ? 'yellow' : 'white'"
                :icon=" favorited ? 'mdi-star' : 'mdi-star-outline'"
              />
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
        <v-btn size="small" icon="mdi-comment-processing-outline" />
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
import SetupDetails from './SetupDetails.vue';
import { ref } from 'vue'

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

</script>

<style scoped lang="css">
.avatar {
  border: solid 2px #37474F;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
}
</style>
