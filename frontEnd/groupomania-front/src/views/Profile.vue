<template>
  <div class="container">
    <h1>Mon Compte GROUPOMANIA</h1>
    <p class="card-subtitle">{{ name }} {{ lastName }}</p>
    <p v-if="isAdmin()">ADMINISTRATEUR</p>
  </div>
</template>

<script>
import userService from "../services/userService";

export default {
  data() {
    return {
      name: "",
      lastName: "",
    };
  },
  methods: {
    getUser() {
      userService.getUser(this.$route.params.id).then((response) => {
        console.log(response.data);
        this.name = response.data.userFound.name;
        this.lastName = response.data.userFound.lastName;
      });
    },
    getUserPost(id) {
      userService.getUserPost(id);
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #d4cfcf;
  height: 100vh;
}
.card-subtitle {
  color: #d3545c;
}
</style>
