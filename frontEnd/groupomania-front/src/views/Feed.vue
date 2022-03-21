<template>
  <div class="main">
    <h1>FIL D'ACTUALITE</h1>
    <div class="container">
      <div class="post-container" v-for="post in posts" :key="post.id">
        <h2 class="post-header">
          Publié par :
          <span class="user-name"
            >{{ post.User.name }} {{ post.User.lastName }}</span
          >
          ({{ dateFormat(post.createdAt) }})
        </h2>
        <p class="post-main__title">
          <a :href="`/post/${post.id}`">
            {{ post.title }}
          </a>
        </p>
        <textarea
          disabled
          class="post-main__body"
          v-model="post.body"
        ></textarea>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postService from "../services/postService";
// import commentService from "../services/commentService";
import userService from "../services/userService";

export default {
  data() {
    return {
      posts: [],
      commentBody: "",
      userIsAdmin: null,
      user: {},
    };
  },
  async mounted() {
    await this.getAllPosts();
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
    getUserInfo() {
      userService.getUser(this.connectedUserId).then((response) => {
        this.userIsAdmin = response.data.userFound.isAdmin;
        this.user = response.data.userFound;
      });
    },
    async getAllPosts() {
      await postService.showAllPosts().then((response) => {
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
    // createComment(id) {
    //   commentService.createComment(id, this.commentBody).then(() => {
    //     this.getAllPosts();
    //     console.log(this.getAllPosts, "caca");
    //     this.getUserInfo();
    //     console.log(this.getUserInfo());
    //     this.commentBody = "";
    //   });
    // },
    // deleteComment(id) {
    //   commentService.deleteComment(id).then(() => {
    //     this.getAllPosts();
    //   });
    // },
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
  margin: 10px 0;
  font-size: larger;
  border-bottom: 3px solid #2f3542;
}
.user-name {
  color: #d3545c;
  font-weight: bold;
}
a {
  text-decoration: none;
  color: inherit;
  &:hover {
    color: #d3545c;
  }
}
.post-main {
  &__title {
    font-weight: bold;
    font-size: 1.5rem;
    width: 60%;
    text-align: center;
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
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 2px solid #2f3542;
  border-radius: 20px;
  height: 30vh;
  width: 60%;
  white-space: nowrap;
  overflow-y: auto;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  @media only screen and (max-width: 768px) {
    width: 90%;
    height: 200px;
  }
}
.display-comment {
  margin-bottom: 2rem;
  width: 100%;
}
.comment-body {
  width: 100%;
  padding-left: 5px;
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
