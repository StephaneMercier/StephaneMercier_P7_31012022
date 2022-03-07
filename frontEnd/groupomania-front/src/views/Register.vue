<template>
  <div class="container-main">
    <h1 class="text-center">GROUPOMANIA - Votre réseau social d'entreprise</h1>
    <div class="container">
      <div class="card-container">
        <h1 class="card-title">S'inscrire</h1>
        <p>
          (Déjà inscrit ? Cliquez <span @click="goToLogin()">ICI</span> pour
          vous connecter à votre compte)
        </p>

        <form class="form-horizontal">
          <input
            id="name"
            v-model="name"
            type="text"
            class="form-control"
            placeholder="Prénom :"
            required
          />
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            class="form-control"
            placeholder="Nom :"
            required
          />
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
          <button @click="createAccount()" class="btn btn-primary">
            C'est parti !
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export default {
  data() {
    return {
      name: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
  computed: {
    validateFields() {
      if (
        this.name == "" ||
        this.lastName == "" ||
        this.email == "" ||
        this.password == ""
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async createAccount() {
      try {
        const response = await instance.post("/signup", {
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });
        console.log(response);
        this.$router.push("/profile");
      } catch (e) {
        console.log({ message: e.message });
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
span {
  color: blue;
}
</style>
