<template>
  <div>
    <h1>dasda</h1>
    <p
      v-for="(post,i) in postData" :key="i"
    >
      {{ post }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import api from '@/services/api'
import { PostType } from './index'



const postData = reactive<PostType[]>([])

async function getSetups() {
  await api
    .get("/setups")
    .then((response) => {

      postData.values = response.data
      console.log('asdjad', postData)

    })
}

onMounted(getSetups)


</script>
