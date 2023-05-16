<template>
  <v-card 
    class="bg-blue-grey-darken-4 mb-4"
    rounded="lg"
    :elevation="10"
  >       
    <v-card-item>
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex flex-row align-center">
          <v-avatar :image="avatar" class="me-4"/>
          <div class="d-flex flex-row align-center">
            <div>
              <v-card-title class="text-body-1 text-left">{{ nome  }}</v-card-title>
              <v-card-subtitle class="text-caption float-start">{{ createdAt }}</v-card-subtitle>
            </div>
          </div>
        </div>
        <v-icon
          class="float-end me-2"
          v-model="favorited"
          @click="favorited = !favorited"
          :color=" favorited ? 'yellow' : 'white'"
          :icon=" favorited ? 'mdi-star' : 'mdi-star-outline'"
        />
      </div>
    </v-card-item>

    <v-carousel 
      show-arrows="hover"
      hide-delimiters
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
          v-model="liked"
          @click="liked = !liked"
          :color=" liked ? 'red' : 'white' "
          :icon=" liked ? 'mdi-heart' : 'mdi-heart-outline'"
        />
        <v-btn size="small" icon="mdi-comment-processing-outline" />
        <v-btn size="small" icon="mdi-share-variant" />
      </div>
      <div>
        <span class="text-body-2">ver mais...</span>
        <v-btn size="small" icon="mdi-information-outline" />
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const liked = ref(false)
const favorited = ref(false)

const postProps = defineProps<{
  nome: string
  createdAt: string
  avatar: string
  imagens: [
    {
      id: string
      url: string
    }
  ]
}>()

</script>
