<template>
  <div>
    <Setup />
  </div>
</template>

<script lang="ts" setup>
import Setup from '@/components/setup/Setup.vue'
import api from '@/services/api'
import { onMounted } from 'vue'


async function getSetups() {
  await api
    .get("/setups")
    .then((response) => {
      console.log(response)
    })
}

onMounted(getSetups)


</script>

<style lang="css" scoped>
</style>