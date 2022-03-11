<template>
  <div class="container">
    <h1>Mon Compte GROUPOMANIA</h1>
    <h2 class="profile-header">{{ name }} {{ lastName }}</h2>
    <p v-for="post in posts" :key="post.id">
      <a :href="`/post/${post.id}`">{{ post.title }}</a>
    </p>
  </div>
</template>

<script>
import userService from "../services/userService";

export default {
  data() {
    return {
      name: "",
      lastName: "",
      posts: [],
    };
  },
  methods: {
    getUser() {
      let token = localStorage.getItem("token");
      const { id } = JSON.parse(token);
      console.log(id);

      userService.getUser(id).then((response) => {
        console.log(response.data);
        this.name = response.data.userFound.name;
        this.lastName = response.data.userFound.lastName;
      });
    },
    getUserPost() {
      let token = localStorage.getItem("token");
      const { id } = JSON.parse(token);
      console.log(id);
      userService.getUserPost(id).then((response) => {
        console.log(response.data);
        this.posts = response.data.userPosts;
      });
    },
  },
  async mounted() {
    await this.getUser();
    await this.getUserPost();
  },
};
</script>

<style lang="css" scoped>
.container {
  background-color: #d4cfcf;
  height: 100vh;
}
.profile-header {
  color: #d3545c;
}
</style>
