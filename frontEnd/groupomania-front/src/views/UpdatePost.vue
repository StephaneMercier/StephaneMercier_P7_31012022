<template>
  <div class="container">
    <form method="post">
      <label for="">TITRE </label>
      <input type="text" v-model="post.title" />
      <label for="">Publication</label>
      <input type="text" v-model="post.body" />
    </form>
    <br />
    <button @click="updatePost()" class="btn btn-primary">Publier</button>
  </div>
</template>

<script>
import postService from "../services/postService";
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    updatePost() {
      postService
        .updatePost(this.$route.params.postId, this.post.title, this.post.body)
        .then(() => {
          this.$router.push("/profile");
        });
    },
  },
  mounted() {
    postService
      .showPost(this.$route.params.postId)
      .then((response) => {
        console.log(response.data);
        this.post.title = response.data.postDetails.title;
        this.post.body = response.data.postDetails.body;
      })
      .catch((e) => {
        console.log(e.message);
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
}
</style>
