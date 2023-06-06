<template>
    <v-card 
        class="bg-blue-grey-darken-4"
        rounded="lg"
        elevation="10" 
    >
        <v-card-title class="text-h5">
            Atualização de dados
        </v-card-title>

        <v-card-item class="text-center">
            <v-avatar
                class="avatar"
                size="80" 
                :image="getOptionUrl(selectedValue)"
            />
        </v-card-item>

        <v-card-text>
            <v-select
                v-model="selectedValue"
                :items="options"
                item-title="publicId"
                :item-value="['publicId',]"
                label="Avatar"
            ></v-select>

            <v-text-field
                label="Name"
                
            ></v-text-field>

            <v-text-field
                type="date"
                label="Data de nascimento"
            >
            </v-text-field>

            <v-text-field
                label="Profissão"
            ></v-text-field>

            <v-text-field
                label="Cidade"
            ></v-text-field>

            <v-text-field
                label="Estado"
            ></v-text-field>
            
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
import { ref } from 'vue'
import { userAuthStore } from '@/store/app'

interface props{
    
}

const emit = defineEmits(['atualizar'])

const auth = userAuthStore()


const options = [
    {
        "publicId": "001-user_r5qlh7",
        "url": "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/001-user_r5qlh7.png"
    },
    {
        "publicId": "007-voter_ctvd8v",
        "url": "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341307/user/007-voter_ctvd8v.png"
    },
    {
        "publicId": "003-woman_p56bqt",
        "url": "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/003-woman_p56bqt.png"
    },
    {
        "publicId": "005-woman-1_pxsueb",
        "url": "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/005-woman-1_pxsueb.png"
    },
    {
        "publicId": "006-acne_v2amnh",
        "url": "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/006-acne_v2amnh.png"
    },
    {
        "publicId": "004-man_cxijip",
        "url": "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/004-man_cxijip.png"
    },
    {
        "publicId": "002-agent_cjjoqf",
        "url": "https://res.cloudinary.com/dflegn4ln/image/upload/v1681341306/user/002-agent_cjjoqf.png"
    }
]

const selectedValue = ref()

function getOptionUrl(publicId: string) {
    const selected = options.find(option => option.publicId === publicId)
    return selected ? selected.url : ''
}

function send() {
    emit('atualizar')
}

</script>

<style scoped lang="css">
.avatar {
  border: solid 2px #37474F;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
}
</style>