<template>
  <header class="header bg-blue-grey-darken-4">
    <img src="./../assets/logo.png" alt="PCTup">
    <router-link to="/login">
      <button class="btn">
        <v-icon icon="mdi-account-outline" size="32"/>
        <span>
          ENTRAR
        </span>
      </button>
    </router-link>
  </header>
</template>

<style lang="css" scoped>
  .header {
    height: 80px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .header img {
    width: 12rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .header a {
    text-decoration: none;
  }

  .btn {
    width: 10rem;
    height: 3.5rem;
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
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    .header img {
      width: 8rem;
    }

    .btn {
      width: 3rem;
      height: 3rem;
      border-radius: 100%;
    }

    .btn span {
      display: none;
    }
  }
</style>