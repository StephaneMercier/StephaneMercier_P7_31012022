<template>
  <div class="main">
    <h1>FIL D'ACTUALITE</h1>
    <div class="container">
      <div class="post-container" v-for="post in posts" :key="post.id">
        <h2 class="post-header">
          Publié par : {{ post.User.name }} {{ post.User.lastName }} ({{
            dateFormat(post.createdAt)
          }})
        </h2>
        <p class="post-main__title">
          {{ post.title }}
        </p>
        <p class="post-main__body">{{ post.body }}</p>
        <div class="comment-input">
          <input
            class="post-main__comment"
            max-length="155"
            type="text"
            placeholder="Votre commentaire :"
            v-model="commentBody"
          />
          <button
            class="btn btn-secondary"
            :disabled="!commentBody.length"
            @click="createComment(post.id)"
          >
            Commenter
          </button>
        </div>
        <h2>Commentaires :</h2>
        <div class="comments-section">
          <div
            class="display-comment"
            v-for="comment in post.Comments"
            :key="comment.id"
          >
            <p class="comment-body">
              {{ comment.body }}
            </p>
            <button class="btn btn-danger" @click="deleteComment(post.id)">
              Supprimer
            </button>
            <p class="comment-info">
              {{ dateFormat(comment.createdAt) }}
            </p>
          </div>
        </div>
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
h1 {
  padding-top: 20px;
  color: #d3545c;
  font-weight: bold;
}
.main {
  background-color: #d4cfcf;
}
.container {
  margin-top: 20px;
  min-height: 100vh;
  padding: 20px;
}
.post-container {
  background-color: #fff;
  width: 100%;
  max-height: 60vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #2f3542;
  border-radius: 20px;
  margin-bottom: 10px;
  padding-top: 5px;
}
.post-header {
  font-size: larger;
  border-bottom: 3px solid #2f3542;
}
.post-main {
  &__title {
    width: 60%;
    border: 2px solid #2f3542;
    border-radius: 20px;
    text-align: left;
    padding: 10px;
    margin-bottom: 4px;
  }
  &__body {
    width: 60%;
    height: 150px;
    border: 2px solid #2f3542;
    border-radius: 20px;
    text-align: left;
    padding: 10px;
  }
  &__comment {
    width: 140%;
    padding: 5px;
    margin-bottom: 2rem;
    border: 2px solid #2f3542;
    border-radius: 20px;
  }
}
.comment-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comments-section {
  padding: 10px;
  border: 2px solid #2f3542;
  border-radius: 20px;
  height: 30vh;
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  overflow-y: auto;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  @media only screen and (max-width: 768px) {
    width: 60%;
    height: 200px;
  }
}
.display-comment {
  margin-bottom: 2rem;
}
.comment-body {
  width: 60%;
  padding-left: 5px;
  margin: 4px 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #d3545c;
  overflow: hidden;
}
.btn {
  border-radius: 20px;
  padding: 3px;
  font-weight: bold;
  font-size: small;
  &.btn-secondary {
    margin: -30px 0 20px 0;
  }
}
</style>
