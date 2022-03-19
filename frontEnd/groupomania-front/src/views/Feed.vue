<template>
  <div class="container">
    <div class="post-container" v-for="post in posts" :key="post.id">
      <p class="post-header">
        Publié par :{{ post.User.name }} {{ post.User.lastName }}, le :
        {{ dateFormat(post.createdAt) }}
      </p>
      <p class="post-main__title">
        {{ post.title }}
      </p>
      <p class="post-main__body">{{ post.body }}</p>
      <div class="date-info"></div>
      <div
        class="display-comment"
        v-for="comment in post.Comments"
        :key="comment.id"
      >
        <p class="comment-body">
          {{ comment.body }}
          <button class="btn btn-danger" @click="deleteComment(post.id)">
            Supprimer
          </button>
        </p>

        <p class="comment-info">{{ dateFormat(comment.createdAt) }}</p>
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
    deleteComment(id) {
      commentService.deleteComment(id).then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  margin: 0;
}
.post-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.post-header {
  border-bottom: 3px solid #2f3542;
  font-weight: bold;
}
.post-main {
  &__title {
    width: 50%;
    border: 2px solid #2f3542;
    border-radius: 20px;
    text-align: left;
    padding: 10px;
    margin-bottom: -2px;
  }
  &__body {
    width: 60%;
    height: 100px;
    border: 2px solid #2f3542;
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
  margin-bottom: 2rem;
}
.comment-body {
  padding-left: 5px;
  margin-bottom: -2px;
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #d3545c;
  overflow: hidden;
}
</style>
