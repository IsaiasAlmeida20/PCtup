<template>
  <form class="form-content bg-blue-grey-darken-4">
    <h3>Entrar no PCtup</h3>
    <div class="input-data">
      <label>E-mail</label>
      <input type="email" placeholder="Digite seu e-mail" />
      <label>Senha</label>
      <input type="password" placeholder="Digite sua senha" />
    </div>
    <button class="btn bg-deep-purple-accent-4">
      <v-icon icon="mdi-login" size="30"/>
      Entrar
    </button>
  </form>
</template>

<style lang="css" scoped>
.form-content {
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4));
  width: 31.25rem;
  height: 24rem;
  gap: 25px;
  padding: 20px;
  border-radius: 8px;
}

.form-content h3 {
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.4));
  gap: 4px;
  font-weight: 500;
  font-size: 1.9rem;
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
  font-weight: 400;
  font-size: 1rem;
  text-align: left;
  margin-left: 10px;
}

@media (max-width: 480px) {

  .form-content h3 {
    font-size: 1.2rem;
  }

  .form-content {
    max-width: 90%;
  }

}
</style>