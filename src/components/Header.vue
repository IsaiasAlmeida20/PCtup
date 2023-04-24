<template>
  <v-app-bar
    class="header"
    color="blue-grey-darken-4"
  >
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <img src="./../assets/logo.png" alt="PCTup">
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <router-link to="/login">
        <button class="btn" title="Entrar">
          <v-icon icon="mdi-account-outline" size="32"/>  
        </button>
      </router-link>
      <v-spacer></v-spacer>
  </v-app-bar>
</template>

<style lang="css" scoped>
  .header {
    overflow: hidden;
    height: 80px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .header img {
    width: 10.5rem;
    padding: 4px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .header a {
    text-decoration: none;
  }

  .btn {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 100%;
    /*width: 10rem;
    height: 3.5rem;
    border-radius: 8px;*/
    background-color: #6200EA;
    color: #FFFFFF;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    font-weight: bold;
    font-size: 1.7rem;
    border: none;
  }

  @media (max-width: 480px) {
    .header img {
      width: 8rem;
    }

    .btn {
      width: 3rem;
      height: 3rem;
      /*border-radius: 100%;*/
    }

    .btn span {
      display: none;
    }
  }
</style>