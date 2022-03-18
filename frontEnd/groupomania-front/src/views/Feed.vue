<template>
  <div class="container">
    <div class="post-container" v-for="post in posts" :key="post.id">
      <p class="post-main__title">
        {{ post.title }}
      </p>
      <p class="post-main__body">{{ post.body }}</p>
      <div class="date-info">
        <p>
          Publié par :{{ post.User.name }} {{ post.User.lastName }} le :
          {{ dateFormat(post.createdAt) }}
        </p>
      </div>
      <div class="display-comment" v-for="item in post.Comments" :key="item.id">
        {{ item.body }} {{ item.createdAt }}
      </div>
      <div>
        <input class="post-main__comment" type="text" v-model="commentBody" />
        <button class="btn btn-secondary" @click="createComment(post.id)">
          Commenter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import postService from "../services/postService";
import commentService from "../services/commentService";
export default {
  data() {
    return {
      posts: [],
      commentBody: "",
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
    createComment(id) {
      commentService.createComment(id, this.commentBody).then((response) => {
        console.log(response.data);
        this.getAllPosts();
        this.commentBody = "";
      });
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
  .display-comment {
    color: black;
  }
}
</style>
