<template>
  <main class="container bg-blue-grey-darken-3">
    <router-link to="/">
      <img src="./../assets/logo.png" alt="PCtup">
    </router-link>
    <form class="form-content bg-blue-grey-darken-4">
      <h3>Entrar no PCtup</h3>
      <div class="input-data">
        <label>E-mail</label>
        <input type="email" placeholder="E-mail" />
        <label>Senha</label>
        <input type="password" placeholder="Senha" />
      </div>
      <button class="btn bg-deep-purple-accent-4">
        <v-icon icon="mdi-login" size="32"/>
        Entrar
      </button>
      <label>
        Não tem uma conta?
        <strong>
          <a> Registre-se</a>
        </strong>
      </label>
    </form>
  </main>
</template>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
    height: 100vh;
  }
  .container img {
    width: 25rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .form-content {
    display: flex;
    flex-direction: column;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4));
    width: 31.25rem;
    height: 25.625rem;
    gap: 25px;
    padding: 20px;
    border-radius: 8px;
  }

  .form-content h3 {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
  }

  .form-content button {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4));
    font-weight: bold;
    font-size: 2rem;
    height: 3.25rem;
    border: none;
    border-radius: 8px;
  }

  .input-data {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input-data input {
    height: 3.25rem;
    border: 1px solid #455A64;
    border-radius: 8px;
    color: #78909C;
    padding: 20px;
    outline: none;
  }

  .input-data label {
    font-weight: bold;
    font-size: 1rem;
    margin-left: 15px;
  }

  @media (max-width: 480px) {
    .container img {
      max-width: 90%;
    }

    .form-content {
      max-width: 90%;
    }
  }
</style>

