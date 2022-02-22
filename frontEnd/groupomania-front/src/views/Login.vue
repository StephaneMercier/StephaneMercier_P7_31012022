<template>
  <div class="container">
    <div class="card-container">
      <h1 class="card-title" v-if="mode == `login`">Se connecter</h1>
      <h1 class="card-title" v-else>S'inscrire</h1>
      <p class="card-subtitle" v-if="mode == `login`">
        Pas encore de compte ?
        <span class="card-action" @click="switchToSignup()"
          >Cliquez ici pour vous inscrire</span
        >
      </p>
      <p class="card-subtitle" v-else>
        Déjà Inscrit ?
        <span class="card-action" @click="switchToLogin()"
          >Cliquez ici pour vous connecter</span
        >
      </p>
      <form action="submit" v-if="mode == 'login'">
        <input type="email" class="form-control" placeholder="E-mail :" />
        <input
          type="password"
          class="form-control"
          placeholder="Mot de Passe :"
        />
        <button type="submit" class="btn btn-primary">Connexion</button>
      </form>

      <form action="submit" v-else>
        <input type="text" class="form-control" placeholder="Nom :" />
        <input type="text" class="form-control" placeholder="Prénom :" />
        <input type="email" class="form-control" placeholder="E-mail :" />
        <input
          type="password"
          class="form-control"
          placeholder="Mot de passe :"
        />
        <button class="btn btn-primary">Inscription</button>
        <button class="btn btn-secondary">Recommencer</button>
      </form>
    </div>
  </div>
</template>
k

<script>
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
  },
};
</script>

<style scoped></style>
