import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accessToken'))
  const userId = ref(localStorage.getItem('userId'))
  const userImg = ref(localStorage.getItem('userImg'))
  const setupId = ref(localStorage.getItem('setupId'))

  function setAcessToken(tokenValue: string) {
    localStorage.setItem('accessToken', tokenValue)
    accessToken.value = tokenValue
  }

  function setUserId(idValue: string) {
    localStorage.setItem('userId', idValue)
    userId.value = idValue
  }

  function setUserImg(imgValue: string) {
    localStorage.setItem('userImg', imgValue)
    userImg.value = imgValue
  }

  function setSetupId(idValue: string) {
    localStorage.setItem('setupId', idValue)
    setupId.value = idValue
  }

  function getAccessToken() {
    return accessToken.value
  }

  function getUserId() {
    return userId.value
  }

  function getUserImg() {
    return userImg.value
  }

  function getSetupId() {
    return setupId.value
  }

  return {
    getAccessToken,
    getUserId,
    getUserImg,
    getSetupId,
    setAcessToken,
    setUserId,
    setUserImg,
    setSetupId
  }
})
