<template>
  <div>
    <div class="container">
      <h1 class="card-title">S'inscrire</h1>
      <p class="card-subtitle">
        (Déjà inscrit ? Cliquez <span @click="goToLogin()">ICI</span> pour vous
        connecter à votre compte)
      </p>
      <div class="container-form">
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
        </form>
      </div>
      <button @click="createAccount()" class="btn btn-primary">
        C'est parti !
      </button>
    </div>
  </div>
</template>

<script>
import authService from "../services/authService.js";

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
    createAccount() {
      try {
        authService
          .signUp(this.name, this.lastName, this.email, this.password)
          .then((response) => console.log(response.data));
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
.container {
  background-image: url(../assets/icon.png);
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
}
.card-title {
  border-bottom: 1px solid #d3545c;
  margin-top: 1.4rem;
}
.card-subtitle {
  margin-top: 1.2rem;
  font-size: 1.2rem;
}
.container-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}
.form-horizontal {
  width: 20rem;
}

.form-control {
  border: 1px solid #2f3542;
  border-radius: 20px;
  margin: 10px;
}
span {
  color: #fff;
  background-color: #d3545c;
  border: 1px solid #d3545c;
  border-radius: 60%;
  margin: 3px;
  padding: 3px;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #2f3542;
    border: 1px solid #2f3542;
  }
}

.btn-primary {
  background-color: #d3545c;
  border: 1px solid #d3545c;
  margin-top: -5rem;
  border-radius: 20px;
  &:hover {
    background-color: #2f3542;
    border: 1px solid #2f3542;
  }
}
</style>
