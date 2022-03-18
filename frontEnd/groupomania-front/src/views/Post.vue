<template>
  <div>
    <h1>test post</h1>
    <div>{{ post.title }} {{ post.body }}</div>
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
};
</script>

<style lang="scss" scoped></style>
