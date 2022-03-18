<template>
  <div class="main">
    <h1 class="home-title">BIENVENUE SUR LE RESEAU SOCIAL GROUPOMANIA</h1>
    <div class="home-links">
      <router-link class="link signup" to="/register">Inscription</router-link>
      <router-link class="link login" to="/login">Connexion</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main {
  background-image: url(../assets/icon.png);
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.home-title {
  font-size: xxxxx-large;
  font-weight: bolder;
  height: 9rem;
  margin-bottom: -80px;
}
.home-links {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.link {
  padding: 3px;
  text-decoration: none;
  color: inherit;
  font-size: x-large;
  font-weight: bold;
  border: 3px solid #d3545c;
  border-radius: 20px;
  &:hover {
    background-color: #d3545c;
    color: #fff;
  }
  &.signup {
    margin: 10px;
  }
  &.login {
    margin: 10px;
  }
}
</style>
