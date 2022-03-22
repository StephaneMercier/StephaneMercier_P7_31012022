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
        <label for="body">----------</label>
        <textarea disabled id="body" v-model="post.body"></textarea>
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
              <label for="comment-body">----------</label>
              <textarea disabled id="comment-body" v-model="comment.body">
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
        this.post = response.data.postDetails;
      });
    },
    getUserInfo() {
      userService.getUser(this.connectedUserId).then((response) => {
        this.userIsAdmin = response.data.userFound.isAdmin;
        this.user = response.data.userFound;
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
      commentService.createComment(id, this.commentBody).then(() => {
        this.getPost();
        this.getUserInfo();
        this.commentBody = "";
      });
    },
    deleteComment(id) {
      commentService.deleteComment(id).then(() => {
        this.getPost();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: -10px;
}
.container {
  margin-top: 20px;
  min-height: 100vh;
  padding: 20px;
}
h1 {
  padding-top: 20px;
  color: #2d4567;
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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
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
    font-weight: bold;
    width: 60%;
    border: 2px solid #2f3542;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 20px;
    text-align: left;
    padding: 10px;
    margin-bottom: 4px;
  }
  &__comment {
    font-weight: bold;
    width: 130%;
    padding: 5px;
    margin-bottom: 2rem;
    border: 2px solid #2f3542;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 20px;
  }
}
#body {
  font-weight: bold;
  width: 60%;
  height: 150px;
  border: 2px solid #2f3542;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border-radius: 20px;
  text-align: left;
  padding: 10px;
}
.comment-input {
  padding: 5px;
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
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border-radius: 20px;
  height: 20vh;
  width: 140%;
  overflow-y: auto;
  text-overflow: ellipsis;
  margin-bottom: 15px;
}
.display-comment {
  padding: 5px;
  margin-bottom: 2rem;
  width: 100%;
}
#comment-body {
  font-weight: bold;
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  border-radius: 20px;
  border: 2px solid #d3545c;
  overflow: hidden;
}
.btn {
  margin: -10px 0 20px 0;
  border-radius: 20px;
  padding: 3px;
  font-weight: bold;
  font-size: small;
  &.btn-secondary {
    // margin: -30px 0 20px 0;
  }
}
</style>
