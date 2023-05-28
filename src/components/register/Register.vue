<template>
  <v-form 
    class="form-content bg-blue-grey-darken-4" 
    @submit.prevent="register"
  >
    <h3>Criar conta no PCtup</h3>
    <div class="input-data">

      <label>Nome</label>
      <v-text-field
        type="text"  
        placeholder="Digite seu nome"
        v-model="userRegister.name" 
      />

      <label>E-mail</label>
      <v-text-field
        type="email" 
        placeholder="Digite seu e-mail" 
        v-model="userRegister.email"
      />

      <label>Senha</label>
      <v-text-field
        type="password" 
        placeholder="Digite sua senha" 
        v-model="userRegister.password"
      />

      <v-btn 
        class="btn bg-deep-purple-accent-4 mb-6 mt-6" 
        type="submit"
        :disabled="disabled"
        @click="overlay = !overlay"
      >
        <v-icon icon="mdi-account-plus-outline" size="30"/>
        Criar Conta
      </v-btn>

    </div>

    <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="48"
      ></v-progress-circular>
    </v-overlay>

    <v-snackbar
      color="orange"
      elevation="24"
      v-model="toast"
      timeout="2000"
    >
      <strong>Revise seus dados e tente novamente.</strong>
    </v-snackbar>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue'
import router from '@/router'
import api from '@/services/api'
import { userAuthStore } from '@/store/app'
import { UserResgister } from '@/components/register/index'
import { title } from 'process'

const auth = userAuthStore()
const overlay = ref(false)
const toast = ref(false)

const userRegister = reactive<UserResgister>({
  name: '',
  email: '',
  password: ''
})

async function register() {
  try {
    const response = await api.post("/signup", userRegister)
    auth.setAcessToken(response.data.accessToken)
    auth.setUserId(response.data.id)
    router.push("/")
    console.log(response)
  } catch (error) {
    toast.value = !toast.value
    console.log(error)
  }
}

watch(overlay, (val) => {
    val && setTimeout(() => {
      overlay.value = false
    }, 2000)
  }
)

const disabled = computed(() => {
  if(userRegister.name === ''  || userRegister.email === '' || userRegister.password === '') {
    return true
  }
  return false
})
</script>


<style lang="css" scoped>
.form-content {
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4));
  width: 31.25rem;
  gap: 25px;
  padding: 20px;
  border-radius: 8px;
}

.form-content h3 {
  font-weight: 400;
  font-size: 1.1rem;
  text-align: center;
}

.input-data {
  display: flex;
  flex-direction: column;
}



.input-data label {
  font-weight: 300;
  font-size: 1rem;
  text-align: left;
  margin-left: 10px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4));
  gap: 4px;
  font-weight: 400;
  font-size: 1.6rem;
  height: 3.25rem;
  border: none;
  border-radius: 8px;
}

@media (max-width: 480px) {

  .form-content h3 {
    font-size: 1.2rem;
  }

  .form-content {
    max-width: 90%;
  }

  .btn {
    font-size: 1.6rem;
  }

}
</style>