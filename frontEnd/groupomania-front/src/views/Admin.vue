<template>
  <div class="container">
    <p v-for="post in posts" :key="post.id">
      {{ post.title }}
      {{ post.body }}
      {{ post.User.name }}
      {{ post.User.lastName }}
      <button class="btn btn-danger" @click="deletePost(post.id)">
        Supprimer
      </button>
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
    await this.getAllPosts();
  },
  methods: {
    async getAllPosts() {
      await postService.showAllPosts().then((response) => {
        this.posts = response.data.allPosts;
      });
    },
    async deletePost(id) {
      await postService.deletePost(id).then(() => {
        this.getAllPosts();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
