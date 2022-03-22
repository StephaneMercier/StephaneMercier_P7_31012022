<template>
  <div>
    <div class="container">
      <h1 class="card-title">S'inscrire</h1>
      <p class="card-subtitle">
        (Déjà inscrit ? Cliquez <span @click="goToLogin()">ICI</span> pour vous
        connecter à votre compte)
      </p>
      <div class="container-form">
        <label for="name" style="opacity: 0">n</label>
        <form class="form-horizontal">
          <input
            id="name"
            v-model="state.name"
            type="text"
            class="form-control"
            placeholder="Prénom :"
            required
          />
          <span class="alert-message" v-if="v$.name.$error">
            {{ v$.name.$errors[0].$message }}
          </span>
          <label for="lastName" style="opacity: 0">n</label>
          <input
            id="lastName"
            v-model="state.lastName"
            type="text"
            class="form-control"
            placeholder="Nom :"
            required
          />
          <span class="alert-message" v-if="v$.lastName.$error">
            {{ v$.lastName.$errors[0].$message }}
          </span>
          <label for="email" style="opacity: 0">n</label>
          <input
            id="email"
            v-model="state.email"
            type="email"
            class="form-control"
            placeholder="Adresse mail :"
            required
          />
          <span class="alert-message" v-if="v$.email.$error">
            {{ v$.email.$errors[0].$message }}
          </span>
          <label for="password" style="opacity: 0">n</label>
          <input
            id="password"
            v-model="state.password"
            type="password"
            class="form-control"
            placeholder="Mot de passe :"
            required
          />
          <span class="alert-message" v-if="v$.password.$error">
            {{ v$.password.$errors[0].$message }}
          </span>
        </form>
      </div>
      <button @click="createAccount()" class="btn btn-primary">
        C'est parti !
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required, email, helpers, minLength } from "@vuelidate/validators";
import authService from "../services/authService.js";

export default {
  setup() {
    const state = reactive({
      name: "",
      lastName: "",
      email: "",
      password: "",
    });

    const rules = computed(() => {
      return {
        name: {
          required: helpers.withMessage("Champ non renseigné", required),
        },
        lastName: {
          required: helpers.withMessage("Champ non renseigné", required),
        },
        email: {
          required: helpers.withMessage("Champ non renseigné", required),
          email: helpers.withMessage("Format invalide", email),
        },
        password: {
          required: helpers.withMessage("Champ non renseigné", required),
          minLength: helpers.withMessage(
            "Min 8 caractères (1 capitale, 1 spécial)",
            minLength(8)
          ),
        },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  methods: {
    createAccount() {
      this.v$.$validate();
      try {
        authService
          .signUp(
            this.state.name,
            this.state.lastName,
            this.state.email,
            this.state.password
          )
          .then(() => this.$router.push("/login"));
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
  font-weight: bold;
  background-color: #2f3542;
  border: 1px solid #2f3542;
  border-radius: 60%;
  margin: 3px;
  padding: 3px;
  cursor: pointer;
  &.alert-message {
    padding: 0.3rem;
    border: 1px solid #2d4567;
    background-color: #2d4567;
    border-radius: 20px;
    font-size: medium;
    font-weight: bold;
  }
}

.btn-primary {
  font-weight: bold;
  background-color: #2f3542;
  border: 1px solid #2f3542;
  margin-top: -1.5rem;
  border-radius: 20px;
  &:hover {
    background-color: #d3545c;
    border: 1px solid #d3545c;
  }
}
</style>
