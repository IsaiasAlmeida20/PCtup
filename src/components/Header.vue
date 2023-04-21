<template>
  <header class="header bg-blue-grey-darken-4">
    <img src="./../assets/logo.png" alt="PCTup">
    <router-link to="/login">
      <button class="btn bg-deep-purple-accent-4">
        <v-icon icon="mdi-login" size="32"/>
        ENTRAR
      </button>
    </router-link>
  </header>
</template>

<style scoped>
 .header {
  height: 80px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  justify-content: space-around;
 }

 .header img{
  width: 12rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
 }

 .header a{
  text-decoration: none;
 }

 .btn {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  font-weight: bold;
  font-size: 1.7rem;
  border: none;
  border-radius: 8px;
  width: 10rem;
  height: 3.5rem;
}
</style>