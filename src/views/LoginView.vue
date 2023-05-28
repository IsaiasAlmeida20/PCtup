<template>
  <main class="container bg-blue-grey-darken-3">
    <router-link to="/">
      <img class="logo" src="./../assets/logo.png" alt="PCtup">
    </router-link>
    <router-view></router-view>
    <label 
      v-if="$route.fullPath.includes('/login')"
      class="mb-10"
    >
      Não tem uma conta?
      <strong>
        <router-link to="/register"> Registre-se</router-link>
      </strong>
    </label>
    <label
      v-else
      class="mb-10"  
    >
      Já tem uma conta?
      <strong>
        <router-link to="/login"> Entrar</router-link>
      </strong>
    </label>
  </main>
</template>

<script lang="ts" setup>

</script>

<style lang="css" scoped>
  .logo {
    max-width: 80%;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    gap: 30px;
    height: 110vh;
  }
  .container img {
    text-align: center;
    width: 25rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .container a {
    color: #FFFFFF;
    text-decoration: none;
  }

  @media (max-width: 480px) {
    .container img {
      max-width: 70%;
    }
  }
</style>

