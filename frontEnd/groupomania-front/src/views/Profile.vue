<template>
  <div class="container">
    <h1>Mon Compte GROUPOMANIA</h1>
    <p class="profile-header">{{ name }} {{ lastName }}</p>
    <p v-for="post in posts" :key="post.id">
      <a :href="`/post/${post.id}`">{{ post.title }}</a>
    </p>
  </div>
</template>

<script>
import userService from "../services/userService";
// import postService from "../services/postService";

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
      userService.getUser(this.$route.params.id).then((response) => {
        console.log(response.data);
        this.name = response.data.userFound.name;
        this.lastName = response.data.userFound.lastName;
      });
    },
    getUserPost() {
      userService.getUserPost(this.$route.params.id).then((response) => {
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
