import { ref } from 'vue'
import { defineStore } from 'pinia'

export const setupStore = defineStore('setup', () => {
    const setupId = ref<string>()

    function setSetupId(id: string) {
        setupId.value = id
    }

    return{
        setupId,
        setSetupId
    }
})