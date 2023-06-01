<template>
    <div class=" d-flex mt-16 justify-center">
        <v-btn @click="sair">Sair</v-btn>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { userAuthStore } from '@/store/app'

const auth = userAuthStore()


function sair() {
    auth.setAcessToken('')
    auth.setUserId('')
    auth.setSetupId('')
    router.push("/")
}
</script>