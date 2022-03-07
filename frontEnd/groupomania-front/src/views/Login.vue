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
// import authHeaders from "../services/authHeader";
import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:3000" });
export default {
  data() {
    return {
      email: "",
      password: "",
      success: false,
    };
  },
  methods: {
    async loginAccount() {
      try {
        const res = await instance.post("/login", {
          email: this.email,
          password: this.password,
        });
        if (res.data.tokenConnect) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      } catch (e) {
        console.log({ message: e.message && "erreur récupération Token" });
      }
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
