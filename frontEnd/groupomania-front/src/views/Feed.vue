<template>
  <div>
    <p v-for="post in posts" :key="post.id">
      {{ post.id }}
      {{ post.body }}
    </p>
  </div>
</template>

<script>
import postService from "../services/postService";
export default {
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    await postService.showAllPosts().then((response) => {
      console.log(response.data);
      this.posts = response.data.allPosts;
    });
  },
};
</script>
