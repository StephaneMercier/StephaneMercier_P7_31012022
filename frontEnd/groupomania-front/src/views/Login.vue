<template>
  <div>
    <div class="container">
      <div class="card-container">
        <h1 class="card-title">Connexion</h1>
        <p class="card-subtitle">
          (Pas encore inscrit ? Cliquez
          <span @click="goToSignup()">ICI</span> pour créer votre compte)
        </p>
        <div class="container-form">
          <form class="form-horizontal">
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
        <button @click="loginAccount()" class="btn btn-primary">
          Me connecter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import authService from "../services/authService";
import { reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required, email, helpers, minLength } from "@vuelidate/validators";

export default {
  setup() {
    const state = reactive({
      email: "",
      password: "",
    });

    const rules = computed(() => {
      return {
        email: {
          required: helpers.withMessage("Champ non renseigné", required),
          email: helpers.withMessage("Format invalide", email),
        },
        password: {
          required: helpers.withMessage("Champ non renseigné", required),
          minLength: helpers.withMessage("Mot de passe invalide", minLength(8)),
        },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  methods: {
    loginAccount() {
      this.v$.$validate();
      try {
        authService
          .logIn(this.state.email, this.state.password)
          .then((response) => {
            localStorage.setItem(
              "token",
              JSON.stringify({
                token: response.data.tokenConnect,
                id: response.data.id,
              })
            ),
              (axios.defaults.headers.common = {
                Authorization: `bearer ${response.data.tokenConnect}`,
              });
            this.$router.push("/profile/");
          });
      } catch (e) {
        console.log({ message: e.message });
      }
    },
    goToSignup() {
      this.$router.push("/register");
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
  margin-top: -10rem;
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
  margin-top: -15rem;
  border-radius: 20px;
  &:hover {
    background-color: #d3545c;
    border: 1px solid #d3545c;
  }
}
</style>
