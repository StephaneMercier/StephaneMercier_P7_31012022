<template>
  <div class="container">
    <h1 class="post-header">
      Votre publication du {{ dateFormat(post.createdAt) }}
    </h1>
    <div class="post-container">{{ post.title }} {{ post.body }}</div>
  </div>
</template>

<script>
import postService from "../services/postService";
export default {
  data() {
    return {
      post: {},
      body: "",
    };
  },
  createComment() {},
  getAllComments() {},
  mounted() {
    postService.showPost(this.$route.params.postId).then((response) => {
      console.log(response.data);
      this.post = response.data.postDetails;
    });
  },
  methods: {
    dateFormat(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-FR", options);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
}
.post-header {
  border-bottom: 2px solid #d3545c;
  margin: 20px;
}
</style>
