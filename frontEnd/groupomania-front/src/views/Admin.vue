<template>
  <div class="container">
    <div class="header">
      <h1 class="admin page-title">Page Administrateur</h1>
      <h2 class="admin page-subtitle">(Modération des publications)</h2>
    </div>
    <div class="main">
      <div class="post-container" v-for="post in posts" :key="post.id">
        <div class="post title">{{ post.title }}</div>
        <label for="body">----------</label>
        <textarea id="body" v-model="post.body"></textarea>
        <div class="user-info">
          Posté par :
          <span class="user-name"
            >{{ post.User.name }} {{ post.User.lastName }}</span
          >
        </div>
        <div class="time-stamp">Le : {{ dateFormat(post.createdAt) }}</div>
        <button class="btn btn-danger" @click="deletePost(post.id)">
          Supprimer
        </button>
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
.container {
  min-height: 100vh;
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post-container {
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  border: 3px solid #2f3542;
  border-radius: 20px;
  padding: 15px 0;
  margin: 20px 20px;
}
.header {
  margin-top: -120px;
}
.admin {
  font-weight: bold;
}
.post {
  border: 2px solid #2f3542;
  border-radius: 20px;
  width: 60%;
  text-align: left;
  padding: 10px;
  &.title {
    margin-bottom: 5px;
    font-weight: bold;
  }
}
#body {
  border: 2px solid #2f3542;
  border-radius: 20px;
  width: 60%;
  text-align: left;
  padding: 10px;
  height: 20vh;
  margin-bottom: 3px;
}
.btn {
  border-radius: 20px;
  font-weight: bold;
}

.user-name {
  padding: 5px;
  color: #e4323e;
  font-weight: bold;
}
</style>
