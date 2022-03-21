<template>
  <div class="main">
    <h1 class="post-header">
      Votre publication du {{ dateFormat(post.createdAt) }}
    </h1>
    <div class="container">
      <div class="post-container">
        <h2 class="post-header">
          Publié par :
          <span class="user-name">{{ user.name }} {{ user.lastName }}</span>
        </h2>
        <p class="post-main__title">
          {{ post.title }}
        </p>
        <textarea
          disabled
          class="post-main__body"
          v-model="post.body"
        ></textarea>
        <div class="comment-input">
          <textarea
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
          <h2>Commentaires :</h2>
          <div class="comments-section">
            <div
              class="display-comment"
              v-for="comment in post.Comments"
              :key="comment.id"
            >
              <textarea disabled class="comment-body" v-model="comment.body">
              </textarea>
              <p class="comment-info">
                {{ dateFormat(comment.createdAt) }}
              </p>
              <button
                v-if="connectedUserId == comment.UserId || userIsAdmin"
                class="btn btn-danger"
                @click="deleteComment(comment.id)"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postService from "../services/postService";
import commentService from "../services/commentService";
import userService from "../services/userService";
export default {
  data() {
    return {
      post: {},
      body: "",
      commentBody: "",
      userIsAdmin: null,
      user: {},
    };
  },
  async mounted() {
    await this.getPost();
    // await postService.showPost(this.$route.params.postId).then((response) => {
    //   console.log(response.data);
    //   this.post = response.data.postDetails;
    // });
    await this.getUserInfo();
  },
  computed: {
    connectedUserId() {
      let token = localStorage.getItem("token");
      const { id } = JSON.parse(token);
      return id;
    },
  },
  methods: {
    getPost() {
      postService.showPost(this.$route.params.postId).then((response) => {
        console.log(response.data);
        this.post = response.data.postDetails;
      });
    },
    getUserInfo() {
      userService.getUser(this.connectedUserId).then((response) => {
        console.log(response.data);
        this.userIsAdmin = response.data.userFound.isAdmin;
        this.user = response.data.userFound;
        console.log("isAdmin ?", this.userIsAdmin);
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
        this.getPost();
        this.commentBody = "";
      });
    },
    deleteComment(id) {
      commentService.deleteComment(id).then((response) => {
        console.log(response.data);
        this.getPost();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #d4cfcf;
  margin-top: -10px;
}
.container {
  margin-top: 20px;
  min-height: 100vh;
  padding: 20px;
}
h1 {
  padding-top: 20px;
  color: #d3545c;
  font-weight: bold;
}
.post-container {
  background-color: #fff;
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #2f3542;
  border-radius: 20px;
  margin-bottom: 10px;
  padding-top: 5px;
}
.post-header {
  margin: 10px 0;
  font-size: larger;
}
.user-name {
  color: #d3545c;
  font-weight: bold;
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
    width: 130%;
    padding: 5px;
    margin-bottom: 2rem;
    border: 2px solid #2f3542;
    border-radius: 20px;
  }
}
.comment-input {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comments-section {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 2px solid #2f3542;
  border-radius: 20px;
  height: 20vh;
  width: 140%;
  overflow-y: auto;
  text-overflow: ellipsis;
  margin-bottom: 15px;
}
.display-comment {
  margin-bottom: 2rem;
  width: 100%;
}
.comment-body {
  width: 100%;
  padding-left: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
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
