<template>
    <v-card 
        class="bg-blue-grey-darken-4"
        rounded="lg"
        elevation="10" 
        width="100%"
    >
        <div class="d-md-flex">
                
            <v-carousel 
                class="container mb-0"
                hide-delimiters
            >
                <v-btn 
                    class="btn"
                    elevation="0"
                    size="large"
                    icon="mdi-close" 
                    color="transparent"
                    @click="$emit('close')"
                />
                <v-carousel-item
                    v-for="(image, i) in imagens"
                    :key="i"
                    :src="image.url"
                    cover
                ></v-carousel-item>
            </v-carousel>
        
            <v-card 
                class="bg-blue-grey-darken-4 w-100"
                elevation="0"
            >
                <v-card-item>
                    <div class="d-flex flex-row align-center justify-space-between">
                        <div class="d-flex flex-row align-center mb-2">
                            <v-avatar size="52" :image="avatar" class="me-4 avatar"/>
                            <div class="d-flex flex-row align-center">
                                <div>
                                    <v-card-title class="text-body-1 text-left">{{ nome }}</v-card-title>
                                    <v-card-subtitle class="text-caption float-start">{{ createdAt }}</v-card-subtitle>
                                </div>
                            </div>
                        </div>
                        <div>
                            <v-btn 
                                v-show="$route.fullPath.includes('/my-setups')"
                                icon="mdi-pencil-outline"
                                elevation="0"
                                color="blue-grey-darken-4"
                            />
                            <v-btn 
                                v-show="$route.fullPath.includes('/my-setups')"
                                icon="mdi-trash-can-outline"
                                elevation="0"
                                color="blue-grey-darken-4"
                                @click="trash(imagens, setupId)"
                            />
                        </div>
                    </div>

                    <v-divider />

                    <div class="text-center mt-4">
                        <v-card-title>{{ titulo }}</v-card-title>
                    </div>
                        <v-card-text class="description ma-2">
                            {{ descricao }}
                        </v-card-text>
                    <div class="comments" @load="getComments(setupId || '')">
                        <div                              
                            v-for="(item, i) in comments"
                            :key="i"
                        >
                            <ul>
                                <li>
                                    <div class="bg-blue-grey-darken-2 ma-2 rounded-lg">
                                        <div class="d-flex flex-row align-center ms-2 user-comment">
                                            <v-avatar size="30" :image="avatar" class="avatar"/>
                                            <v-card-text class="text-subtitle-1 float-start">{{ nome }}</v-card-text> 
                                        </div> 
                                        <div class="ms-12 text-caption">{{ item.descricao }}</div>   
                                    </div>
                                </li>
                            </ul>                               
                        </div>
                    </div>
                </v-card-item>
                <v-card-actions >
                    <v-text-field
                        append-inner-icon="mdi-send"
                        placeholder="Escreva um comentario"
                    />
                </v-card-actions>
            </v-card>          
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import api from '@/services/api'
import { CommentType } from '@/types/comonTypes'

interface props{
    setupId?: string
    nome: string
    descricao: string
    titulo: string
    createdAt: string
    avatar: string
    imagens: [
        {
        publicId: string
        url: string
        }
    ]
}

const postProps = defineProps<props>()

const comments = reactive<CommentType[]>([])

async function getComments(setupId: string) {
  try {
    const response = await api.get<CommentType[]>(`/comments/setups/${setupId}`);
    comments.splice(0, comments.length, ...response.data);
  } catch (error) {
    console.error(error);
  }
}

function trash(imagems: [{ publicId: string; url: string; }], setupId:string | undefined){
    for (const item in imagems) {
        console.log(item)
    }
    console.log(setupId)
}


</script>

<style scoped lang="css">
.container {
  position: relative;
  display: inline-block;
}

.avatar {
  border: solid 2px #37474F;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
}

.btn {
  position: absolute;
  top: 10px; 
  left: 10px; 
  z-index: 1;
}

.comments {
    max-height: 157px;
    overflow: hidden;
}

.user-comment {
    max-height: 35px;
}

.description {
    height: 100px;
    overflow: hidden;
}
</style>