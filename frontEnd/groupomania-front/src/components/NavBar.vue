<template>
  <div>
    <nav class="navbar">
      <img
        class="nav-img"
        src="@/assets/icon-left-font-monochrome-white.png"
        alt="logo Groupomania white"
      />

      <div class="nav-links">
        <router-link class="nav-link" to="/profile">Mon compte</router-link>
        <router-link class="nav-link" to="/feed">Fil d'actualité</router-link>
        <router-link class="nav-link" @click="logOut()" to="/login"
          >Déconnexion</router-link
        >
      </div>
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

<style lang="scss" scoped>
.navbar {
  background-color: #d3545c;
  opacity: 0.8;
  margin-bottom: 2rem;
}

.nav-img {
  height: 15rem;
  width: 15rem;
  margin: -60px 0 -40px 0;
}
.nav-links {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
}
.nav-link {
  padding: 0 10px;
  text-decoration: none;
  color: #000;
  font-size: 1.2rem;

  font-weight: bold;
  border: 1px solid #fff;
  border-radius: 20px;
  background-color: #fff;
  &:hover {
    color: #fff;
    background-color: #2f3542;
  }
}
</style>
