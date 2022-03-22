<template>
  <div class="container">
    <h1 class="post-header">Publication à modifier :</h1>
    <div class="container-post">
      <form class="post-update" method="post">
        <label for="title">Titre :</label>
        <textarea id="title" type="text" v-model="post.title" />
        <label for="body">Contenu :</label>
        <textarea id="body" type="text" v-model="post.body" />
      </form>
    </div>
    <button
      :disabled="!post.title.length || !post.body.length"
      @click="updatePost()"
      class="btn btn-secondary"
    >
      Publier
    </button>
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
    postService.showPost(this.$route.params.postId).then((response) => {
      this.post.title = response.data.postDetails.title;
      this.post.body = response.data.postDetails.body;
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
  min-height: 100vh;
}
.post-update {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#title {
  border: 2px solid #2f3542;
  border-radius: 20px;
  width: 60%;
  text-align: left;
  padding: 10px;
  margin-bottom: 5px;
  font-weight: bold;
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
</style>
