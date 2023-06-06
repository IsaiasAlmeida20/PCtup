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
                size="80" 
                image="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
            />
        </v-card-item>

        <v-card-text>
            <v-select
                label="Avatar"
                :items="profiles"
            ></v-select>

            <v-text-field
                label="Name"
            ></v-text-field>

            <v-text-field
                label="Data de nascimento"
            ></v-text-field>

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
            @click="$emit('atualizar')"
        >
            Salvar
        </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import profiles from '@/components/profile/profiles.json'


</script>