<template>
  <div>
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #41c489;
    }
  }
}
</style>
