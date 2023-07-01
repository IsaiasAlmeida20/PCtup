<template>
    <v-card 
        class="bg-blue-grey-darken-4"
        rounded="lg"
        elevation="10" 
    >
        <v-card-title class="text-h5">
            Atualização de dados
        </v-card-title>

        <!--  <v-card-item class="text-center">
                <v-avatar
                    class="avatar"
                    size="80" 
                    :image="getOptionUrl(selectedValue)"
                />
            </v-card-item> -->

        <v-card-text>
            <v-select
                v-model="selectedValue"
                :items="options"
                item-title="name"
                item-value="name"
                label="Avatar Perfil"
                chips
                return-object
                single-line
            > 
                <template v-slot:chip="{ props, item }">
                    <v-chip
                        v-bind="props"
                        size="large"
                        :prepend-avatar="item?.raw?.url"
                        :title="item?.raw?.name"
                    ></v-chip>
                </template>
                <template v-slot:item="{ props, item }">
                    <v-list-item
                        class="bg-blue-grey-darken-2 ma-0"
                        v-bind="props"
                        :prepend-avatar="item?.raw?.url"
                        :title="item?.raw?.name"
                    ></v-list-item>
                </template>  
            </v-select>

            <v-text-field label="Nome" v-model="userUpdatedData.nome"/>

            <v-text-field type="date" label="Data de nascimento" v-model="userUpdatedData.dataNascimento"/>

            <v-text-field label="Profissão" v-model="userUpdatedData.profissao"/>

            <v-text-field label="Cidade" v-model="userUpdatedData.cidade"/>

            <v-text-field label="Estado" v-model="userUpdatedData.estado"/>
            
        </v-card-text>

        <v-card-actions>
        <v-btn
            color="green-darken-1"
            variant="text"
            @click="$emit('cancelar')"
        >
            Cancelar
        </v-btn>
        <v-btn
            color="green-darken-1"
            variant="text"
            @click="send"
        >
            Salvar
        </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { userAuthStore } from '@/store/app'
import { UserType } from '@/types/comonTypes'
import api from '@/services/api'

const auth = userAuthStore()
const userId = auth.getUserId()

const emit = defineEmits(['atualizar'])

const userUpdatedData = reactive<UserType>({
  nome: '',
  dataNascimento: '',
  profissao: '',
  estado: '',
  cidade: '',
  imagem: {
    publicId: '',
    url: '',
  }
})

const options = [
    {
        name:"profile-1",
        publicId:"001-user_r5qlh7",
        url: "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/001-user_r5qlh7.png"
    },
    {
        name: "profile-2",
        publicId: "007-voter_ctvd8v",
        url: "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341307/user/007-voter_ctvd8v.png"
    },
    {
        name: "profile-3",
        publicId: "003-woman_p56bqt",
        url: "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/003-woman_p56bqt.png"
    },
    {
        name: "profile-4",
        publicId: "005-woman-1_pxsueb",
        url: "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/005-woman-1_pxsueb.png"
    },
    {
        name: "profile-5",
        publicId: "006-acne_v2amnh",
        url: "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/006-acne_v2amnh.png"
    },
    {
        name: "profile-6",
        publicId: "004-man_cxijip",
        url: "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/004-man_cxijip.png"
    },
    {
        name: "profile-7",
        publicId: "002-agent_cjjoqf",
        url: "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/002-agent_cjjoqf.png"
    }
]

const selectedValue = ref()

function getOptionUrl(name: string) {
    const selected = options.find(option => option.name === name)
    return selected ? selected.url : ''
}

async function send() {
    emit('atualizar')
    userUpdatedData.imagem.publicId  = selectedValue?.value.publicId
    userUpdatedData.imagem.url = selectedValue?.value.url
    try {
        console.log(userUpdatedData)
        await api.put(`/users/${userId}`, userUpdatedData, {
            headers: {
                Authorization: auth.getAccessToken()
            }
        })
    } catch (error) {
       console.log(error) 
    }
}

</script>

<style scoped lang="css">
.avatar {
  border: solid 2px #37474F;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
}
</style>