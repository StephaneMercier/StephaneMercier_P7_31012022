<template>
  <div class="container">
    <div class="card-container">
      <h1 class="card-title" v-if="mode == `login`">Se connecter</h1>
      <h1 class="card-title" v-else>S'inscrire</h1>
      <p class="card-subtitle" v-if="mode == `login`">
        (Pas encore de compte ?
        <span class="card-action" @click="switchToSignup()"
          >Cliquez ici pour vous inscrire)</span
        >
      </p>
      <p class="card-subtitle" v-else>
        (Déjà Inscrit ?
        <span class="card-action" @click="switchToLogin()"
          >Cliquez ici pour vous connecter)</span
        >
      </p>
      <form v-if="mode == 'login'">
        <input
          id="email"
          v-model="email"
          type="email"
          class="form-control"
          placeholder="E-mail :"
          required
        />
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="Mot de Passe :"
          required
        />
        <br />
        <button class="btn btn-primary" :disabled="switchToDisabled()">
          Connexion
        </button>
      </form>

      <form v-else>
        <input
          id="name"
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Nom :"
          required
        />
        <input
          id="lastName"
          v-model="lastName"
          type="text"
          class="form-control"
          placeholder="Prénom :"
          required
        />
        <input
          id="email"
          v-model="email"
          type="email"
          class="form-control"
          placeholder="E-mail :"
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

        <button
          @click="createAccount()"
          class="btn btn-primary"
          :disabled="switchToDisabled()"
        >
          C'est parti !
        </button>
      </form>
    </div>
  </div>
</template>
k

<script>
const axios = require("axios").default;
export default {
  name: "Login",
  data() {
    return {
      mode: "login",
      name: "",
      lastName: "",
      password: "",
      email: "",
    };
  },
  methods: {
    switchToSignup: function () {
      this.mode = "signup";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    switchToDisabled: function () {
      if (this.mode == "signup") {
        if (
          this.email == "" ||
          this.password == "" ||
          this.name == "" ||
          this.lastName == ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email == "" || this.password == "") {
          return true;
        } else {
          return false;
        }
      }
    },
    createAccount: async function () {
      try {
        const response = await axios.post("http://localhost:3000/api/user");
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
