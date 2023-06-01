<template>
    <v-app class="bg-blue-grey-darken-3">
        <Header />
        <router-view></router-view>
    </v-app>
</template>

<script setup lang="ts">
import Header from '@/components/header/Header.vue';

</script>