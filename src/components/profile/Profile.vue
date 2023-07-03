<template>
    <div class="container">
        <v-card 
            class="bg-blue-grey-darken-4 mx-auto text-center" 
            max-width="800"
            rounded="lg"
            elevation="10"  
            width="90%"
            
        >
            <v-card-title align="center">
                <div 
                    class="bg-blue-grey-darken-3 avatar-container"
                >
                    <v-avatar
                        class="avatar"
                        size="180" 
                        :image="userData?.imagem.url"
                    />
                </div>
            </v-card-title>
            <v-card-item>
                <v-card-title>{{ userData?.nome }}</v-card-title>

                <v-card-subtitle>
                    <span>{{ userData?.profissao }}</span>
                </v-card-subtitle>
            </v-card-item>

            <v-card-text>
                <v-card-title>Seus Dados</v-card-title>
                <div class="my-4 text-subtitle-1">
                    • E-mail: {{ userData?.email }}
                </div>
                <div class="my-4 text-subtitle-1">
                    • Data de Nascimento: {{ userData?.dataNascimento ? formatedDate(userData.dataNascimento) : 'N/A'}}
                </div>
                <div class="my-4 text-subtitle-1">
                    • Estado: {{ userData?.estado }}
                </div>
                <div class="my-4 text-subtitle-1">
                    • Cidade: {{ userData?.cidade }}
                </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="d-flex justify-space-between">      
                    
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="800"
                    width="90%"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            v-bind="props"
                        >
                            <v-icon>mdi-pencil</v-icon>
                            Editar Perfil
                        </v-btn>
                    </template>
                    <UpdateProfile 
                        @cancelar="cancelar"
                        @atualizar="salvar" 
                    />
                </v-dialog>
                <v-btn
                    color="deep-purple-lighten-2"
                    variant="text"
                    @click="sair"
                >
                    <v-icon>mdi-logout</v-icon>
                    Sair
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'
import api from '@/services/api'
import { format } from 'date-fns'
import { userAuthStore } from '@/store/app'
import { UserType } from '@/types/comonTypes'
import UpdateProfile from './UpdateProfile.vue'

const auth = userAuthStore()

const dialog = ref<boolean>(false)

const userData = ref<UserType>()

async function getUserData() {
  const userId = auth.getUserId()
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: auth.getAccessToken()
      }
    })
    userData.value = response.data
  } catch (error) {
    console.log(error)
  }
}

function cancelar(){
    dialog.value = false
}

function salvar() {
    dialog.value = false
    getUserData()
}

function sair() {
    auth.setAcessToken('')
    auth.setUserId('')
    router.push("/")
}

const formatedDate = (data: string) => {
  const dataFormatada = new Date(data);
  return format(dataFormatada, 'dd/MM/yyyy');
}

onMounted(getUserData)

</script>

<style scoped lang="css">

.container {
    margin-top: 80px;
    margin-bottom: 40px;
}
.avatar-container {
    position: relative;
    border-radius: 8px;
    margin-top: 4px;
    margin-bottom: 70px;
    overflow: visible;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.2));
}

.avatar {
    position: -webkit-sticky;
    bottom: -70px;
    border: solid 4px #263238;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
}
</style>