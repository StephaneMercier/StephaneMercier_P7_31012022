<template>
  <div>
    <nav class="navbar" align="center">
      <a href="/register">
        <img
          class="nav-img"
          src="@/assets/icon-left-font-monochrome-white.png"
          alt="logo Groupomania blanc"
      /></a>

      <div class="nav-links">
        <!-- <i icon="fa-solid fa-user-secret" /> -->
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
@media screen and (max-width: 768px) {
  .navbar {
    background-color: #d3545c;
    opacity: 0.8;
    display: flex;
    flex-direction: column;
  }

  .nav-img {
    height: 15rem;
    width: 15rem;
    margin: -50px 0 -40px 10px;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    margin-bottom: 1rem;
    &:hover {
      color: #fff;
      background-color: #2f3542;
    }
  }
}

@media screen and (min-width: 768.98px) {
  .navbar {
    background-color: #2d4567;
  }

  .nav-img {
    height: 15rem;
    width: 15rem;
    margin: -50px 0 -40px 10px;
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
      background-color: #d3545c;
    }
  }
}
</style>
