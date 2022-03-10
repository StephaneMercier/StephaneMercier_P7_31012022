<template>
  <div>
    <h1 class="text-center">GROUPOMANIA - Votre réseau social d'entreprise</h1>
    <div class="container">
      <div class="card-container">
        <h1 class="card-title">Connexion</h1>
        <p class="card-subtitle">
          (Pas encore inscrit ? Cliquez
          <span @click="goToSignup()">ICI</span> pour créer votre compte)
        </p>

        <form class="form-horizontal">
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Adresse mail :"
            required
          />
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Mot de passe :"
            required
          />
          <br />
          <button @click="loginAccount()" class="btn btn-primary">
            Me connecter
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import authService from "../services/authService";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginAccount() {
      authService.logIn(this.email, this.password).then((response) => {
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: response.data.tokenConnect,
            id: response.data.id,
          })
        ),
          this.$router.push("/profile/");
      });
    },
    goToSignup() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  color: blue;
}
</style>
