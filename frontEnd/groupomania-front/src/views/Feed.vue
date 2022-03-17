<template>
  <div class="container">
    <div v-for="post in posts" :key="post.id">
      {{ post.title }}
      {{ post.body }}
      {{ post.User.name }}
      {{ post.User.lastName }}
      <div v-for="comment in comments" :key="comment.id">
        {{ comment.body }}
      </div>
    </div>
  </div>
</template>

<script>
import postService from "../services/postService";
export default {
  data() {
    return {
      posts: [],
      comments: [],
    };
  },
  async mounted() {
    await this.getAllPosts();
  },
  methods: {
    async getAllPosts() {
      await postService.showAllPosts().then((response) => {
        console.log(response.data);
        this.posts = response.data.allPosts;
        this.comments = response.data.allComments;
        console.log(this.comments);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
}
</style>
