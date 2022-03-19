<template>
  <div class="container">
    <h1 class="post-header">Publication à modifier :</h1>
    <div class="container-post">
      <form method="post">
        <label for="">Titre</label>
        <input class="post-title" type="text" v-model="post.title" />
        <label for="">Publication</label>
        <input class="post-body" type="text" v-model="post.body" />
      </form>
    </div>
    <br />
    <button @click="updatePost()" class="btn btn-secondary">Publier</button>
  </div>
</template>

<script>
import postService from "../services/postService";
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    updatePost() {
      postService
        .updatePost(this.$route.params.postId, this.post.title, this.post.body)
        .then(() => {
          this.$router.push("/profile");
        });
    },
  },
  mounted() {
    postService
      .showPost(this.$route.params.postId)
      .then((response) => {
        console.log(response.data);
        this.post.title = response.data.postDetails.title;
        this.post.body = response.data.postDetails.body;
      })
      .catch((e) => {
        console.log(e.message);
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  min-height: 100vh;
}
.container-post {
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>
