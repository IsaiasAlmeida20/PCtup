import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accessToken'))
  const userId = ref(localStorage.getItem('userId'))

  function setAcessToken(tokenValue: string) {
    localStorage.setItem('accessToken', tokenValue)
    accessToken.value = tokenValue
  }

  function setUserId(idValue: string) {
    localStorage.setItem('userId', idValue)
    userId.value = idValue
  }

  function getAccessToken() {
    return accessToken.value
  }

  function getUserId() {
    return userId.value
  }

  return {
    getAccessToken,
    getUserId,
    setAcessToken,
    setUserId,
  }
})
