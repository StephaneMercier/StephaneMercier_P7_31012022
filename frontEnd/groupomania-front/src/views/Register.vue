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
            v-model="state.name"
            type="text"
            class="form-control"
            placeholder="Prénom :"
            required
          />
          <span class="alert-message" v-if="v$.name.$error">
            {{ v$.name.$errors[0].$message }}
          </span>
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
      <button @click="createAccount()" class="btn btn-primary">
        C'est parti !
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
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
          required: helpers.withMessage("Format invalide", required),
          email,
        },
        password: {
          required: helpers.withMessage(
            "min 8 caractères (1 capitale et 1 spécial)",
            required
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
      // if (!this.v$.$error) {
      //   alert("form submitted");
      // } else {
      //   alert("form failed submission");
      // }
      try {
        authService
          .signUp(
            this.state.name,
            this.state.lastName,
            this.state.email,
            this.state.password
          )
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
  &.alert-message {
    padding: 0.3rem;
    border: 1px solid #2f3542;
    background-color: grey;
    border-radius: 20px;
    font-size: medium;
    font-weight: bold;
  }
}

.btn-primary {
  background-color: #d3545c;
  border: 1px solid #d3545c;
  margin-top: -1.5rem;
  border-radius: 20px;
  &:hover {
    background-color: #2f3542;
    border: 1px solid #2f3542;
  }
}
</style>
