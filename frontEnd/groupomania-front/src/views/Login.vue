<template>
  <div class="container">
    <img src="" alt="logo-groupomania-black" />
    <div class="card">
      <h1 class="card-title" v-if="mode == `login`">Connexion</h1>
      <h1 class="card-title" v-if="mode == `signup`">Créer mon Compte</h1>
      <p class="card-subtitle" v-if="mode == `login`">
        Pas encore inscrit(e) ?
        <span class="card-action" @click="switchToSignup()"
          >Cliquez ici pour créer votre compte</span
        >
      </p>
      <input
        type="text"
        class="form-control"
        placeholder="Votre Prénom"
        v-if="mode == `signup`"
      />
      <input
        type="text"
        class="form-control"
        placeholder="Votre Nom"
        v-if="mode == `signup`"
      />
      <input
        type="email"
        class="form-control"
        placeholder="Votre adresse mail"
      />
      <input
        type="password"
        class="form-control"
        placeholder="Votre mot de passe"
      />
      <button class="btn btn-primary" type="submit" v-if="mode == `signup`">
        M'inscrire
      </button>
      <button class="btn btn-primary" type="submit" v-if="mode == `login`">
        Me connecter
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      mode: "login",
    };
  },
  methods: {
    switchToSignup() {
      this.mode = "signup";
    },
    switchToLogin() {
      this.mode = "login";
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
}
.card {
  border: 3px solid black;
  border-radius: 10%;
  width: 400px;
  height: 400px;
}
.card-action {
  color: darkblue;
  cursor: pointer;
  &.card-action:hover {
    color: blue;
  }
}
.card-subtitle {
  color: black;
}
.form-control {
  border: 1px solid black;
  border-radius: 20px 20px 20px 20px;
  margin: 10px;
  height: 2rem;
  display: flex;
  justify-content: space-around;
  &::placeholder {
  }
}
</style>
