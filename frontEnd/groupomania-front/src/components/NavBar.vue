<template>
  <div class="container">
    <nav class="navbar navbar-">
      <img
        src="../assets/icon-left-font-monochrome-white.png"
        alt="logo Groupomania white"
      />
      <router-link to="/profile">Mon compte</router-link>
      <router-link @click="logOut()" to="/login">Déconnexion</router-link>
    </nav>
  </div>
</template>

<script>
import authService from "../services/authService";
export default {
  methods: {
    logOut() {
      authService.logout();
    },
  },
};
</script>

<style scoped>
* {
  text-decoration: none;
  color: inherit;
}
.container {
  background-color: #d3545c;
  border: 2px solid #d3545c;
  text-decoration: none;
}
img {
  width: 12rem;
  height: 9rem;
}
nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
