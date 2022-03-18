<template>
  <div class="container">
    <div class="post-container" v-for="post in posts" :key="post.id">
      <p class="post-main__title">
        {{ post.title }}
      </p>
      <p class="post-main__body">{{ post.body }}</p>
      <div class="date-info">
        <p>Publié par :{{ post.User.name }} {{ post.User.lastName }}</p>
        <p>le : {{ dateFormat(post.createdAt) }}</p>
      </div>
      <div v-for="comment in comments" :key="comment.id">
        {{ post.comment.body }}
      </div>
      <div>
        <input class="post-main__comment" type="text" v-model="body" />
        <button class="btn btn-secondary">Commenter</button>
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
        console.log(this.comments);
      });
    },
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
@media only screen and (min-width: 768.98px) {
  .container {
    min-height: 100vh;
  }
  .post-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .post-main {
    &__title {
      width: 30%;
      border: 1px solid #2f3542;
      border-radius: 20px;
      text-align: left;
      padding: 10px;
    }
    &__body {
      width: 60%;
      height: 100px;
      border: 1px solid #2f3542;
      border-radius: 20px;
      text-align: left;
      padding: 10px;
    }
    &__comment {
      margin-bottom: 2rem;
      border: 1px solid #2f3542;
      border-radius: 20px;
    }
  }
}
</style>
