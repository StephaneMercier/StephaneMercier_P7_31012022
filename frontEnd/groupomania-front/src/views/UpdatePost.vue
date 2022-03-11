<template>
  <div>
    <p>test update</p>
    <form method="post">
      <label for="">TITRE </label>
      <input type="text" v-model="post.title" />
      <label for="">Publication</label>
      <input type="text" v-model="post.body" />
    </form>
    <br />
    <button class="btn btn-primary">Publier</button>
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
  methods: {},
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

<style lang="scss" scoped></style>
