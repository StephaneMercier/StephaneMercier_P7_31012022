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
        <label for="body">-----------------</label>
        <textarea disabled id="body" v-model="post.body"></textarea>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postService from "../services/postService";
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
  },
};
</script>

<style lang="scss" scoped>
h1 {
  padding-top: 20px;
  color: #2d4567;
  font-weight: bold;
}
h2 {
  margin-top: 20px;
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
  border: 3px solid #2f3542;
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
  &__comment {
    font-weight: bold;
    width: 140%;
    padding: 5px;
    margin-bottom: 2rem;
    border: 2px solid #2f3542;
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
#comment-body {
  width: 100%;
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
  border-radius: 20px;
  border: 2px solid #d3545c;
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
