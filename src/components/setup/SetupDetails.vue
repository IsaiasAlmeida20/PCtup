<template>
    <v-card @vnode-mounted="getComments(setupId)" class="bg-blue-grey-darken-4" rounded="lg" elevation="10" width="100%">
        <div class="d-md-flex">

            <v-carousel class="container mb-0" hide-delimiters>
                <v-btn class="btn" elevation="0" size="large" icon="mdi-close" color="transparent"
                    @click="$emit('close')" />
                <v-carousel-item v-for="(image, i) in imagens" :key="i" :src="image.url" cover></v-carousel-item>
            </v-carousel>

            <v-card class="bg-blue-grey-darken-4 w-100" elevation="0">
                <v-card-item>
                    <div class="d-flex flex-row align-center justify-space-between">
                        <div class="d-flex flex-row align-center mb-2">
                            <v-avatar size="52" :image="avatar" class="me-4 avatar" />
                            <div class="d-flex flex-row align-center">
                                <div>
                                    <v-card-title class="text-body-1 text-left">{{ nome }}</v-card-title>
                                    <v-card-subtitle class="text-caption float-start">{{ createdAt }}</v-card-subtitle>
                                </div>
                            </div>
                        </div>
                    </div>
                    <v-divider />
                    <div class="text-center mt-4">
                        <v-card-title>{{ titulo }}</v-card-title>
                    </div>
                    <v-card-text class="description ma-2">
                        {{ descricao }}
                    </v-card-text>
                </v-card-item>
                <v-card-text>
                    <h3 class="ms-6 ">Comentarios</h3>
                    <v-divider class="mb-1"/>
                    <div class="comments">
                        <div v-if="comments.length === 0">
                            <v-card
                                size="x-large" 
                                rounded="lg"
                                v-if="comments.length === 0 && loading === false" 
                                class="pa-4 mt-12 mb-12 bg-blue-grey-darken-2"
                            >
                                <p class="text-body-2"> 
                                    Ninguém comentou nesse setup :( <br>
                                    Seja o primeiro a comentar.
                                </p>
                            </v-card>
                            <v-spacer/>
                            <div class="text-center mt-12 mb-12">
                                <v-progress-circular
                                    v-if="comments.length === 0 && loading === true"
                                    :active="loading"
                                    :indeterminate="loading"
                                    color="cyan"
                                />
                            </div>
                        </div>
                        <div v-for="(item, i) in comments" :key="i">
                            <ul>
                                <li>
                                    <div class="bg-blue-grey-darken-2 rounded-lg mb-4">
                                        <div class="d-flex align-center justify-space-between rounded-lg">
                                            <div class="d-flex flex-row align-center ms-2">
                                                <v-avatar size="32" :image="item.usuario.imagem.url" class="me-2 avatar"/>
                                                <div class="d-flex flex-row align-center">
                                                    <div>
                                                        <v-card-text class="pa-0">{{ item.usuario.nome  }}</v-card-text >
                                                        <v-card-text class="text-caption float-start pa-0">{{ formatedDate(item.createdAt) }}</v-card-text >
                                                    </div>
                                                </div>
                                            </div>
                                            <div  class="float-end me-4 rounded-lg" v-show="userId === item.usuarioId">
                                                <v-dialog v-model="dialogComment" width="400">
                                                    <template v-slot:activator="{ props }">
                                                        <v-btn 
                                                            v-bind="props"
                                                            size="24"
                                                            icon="mdi-trash-can-outline"
                                                            elevation="0" 
                                                            color="blue-grey-darken-2" 
                                                        />
                                                    </template>

                                                    <v-card color="blue-grey-darken-2" class="d-flex align-center">
                                                        <v-card-title class="text-body-1">Quer mesmo deletar este comentario?</v-card-title>
                                                        <v-card-actions class="text-center">
                                                            <v-btn variant="tonal" @click="dialogComment = !dialogComment"> Não </v-btn>
                                                            <v-btn variant="tonal" @click="deleteComment(item._id, setupId), dialogComment = !dialogComment">
                                                                Sim
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </div>
                                        </div>
                                        <div class="ms-12 mb-4 pb-2 pt-2">{{ item.descricao }}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions class="pb-0 pt-0">
                    <v-text-field 
                        v-model="comment" 
                        @click:append-inner="send(setupId), comment = ''" 
                        density="compact"
                        append-inner-icon="mdi-send" 
                        placeholder="Escreva um comentario" 
                    />
                </v-card-actions>
            </v-card>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { format } from 'date-fns';
import api from '@/services/api'
import { userAuthStore } from '@/store/app'
import { CommentType } from '@/types/comonTypes'

interface props {
    setupId: string
    userId: string
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

const auth = userAuthStore()
const userId = auth.getUserId()

const dialogComment = ref<boolean>(false)
const loading = ref<boolean>(false)
const comment = ref<string>()
const postProps = defineProps<props>()
const comments = reactive<CommentType[]>([])

async function getComments(setupId: string) {
    try {
        loading.value = true
        const response = await api.get<CommentType[]>(`/comments/setups/${setupId}`);
        comments.splice(0, comments.length, ...response.data);
        loading.value = false
    } catch (error) {
        console.error(error);
    }
}

async function send(setupId: string) {
    try {
        return await api.post('/comments', {
                usuarioId: userId,
                setupId: setupId,
                descricao: comment.value
            },
            {
                headers: {
                    Authorization: auth.getAccessToken()
                }
            }
        ),
        getComments(setupId)
    } catch (error) {
        console.log(error)
    }
} 

async function deleteComment(commentId: string, setupId: string) {
    await api.delete(`/comments/${commentId}`)
    getComments(setupId)
}

const formatedDate = (data: string) => {
  const dataFormatada = new Date(data)
  return format(dataFormatada, 'dd/MM/yyyy')
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
    max-height: 140px;
    overflow-y: scroll;
}

.comments::-webkit-scrollbar {
    display: none;
}

.user-comment {
    max-height: 35px;
}

.card-comments {
    position: relative;
    bottom: -27%;
}

.description {
    height: 100px;
    overflow-y: scroll;
}

.description::-webkit-scrollbar {
    display: none;
}
</style>