<template>
  <div class="container">
    <div class="card-container">
      <h1 class="card-title" v-if="mode == login">Se connecter</h1>
      <h1 class="card-title" v-else>S'inscrire</h1>
    </div>
  </div>
</template>

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
};
</script>

<style scoped></style>
