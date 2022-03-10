<template>
  <div>
    <h1>test post</h1>
    <p>{{ post.id }} {{ post.title }} {{ post.body }}</p>
  </div>
</template>

<script>
import postService from "../services/postService";
export default {
  data() {
    return {
      post: {},
    };
  },
  mounted() {
    postService.showPost(this.$route.params.postId).then((response) => {
      console.log(response.data);
      this.post = response.data.postDetails;
    });
  },
};
</script>

<style lang="scss" scoped></style>
