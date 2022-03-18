<template>
  <div>
    <h1>test post</h1>
    <div>{{ post.title }} {{ post.body }}</div>
    <!-- <div class="display-comment" v-for="item in post.Comments" :key="item.id">
        {{ item.body }} {{ item.createdAt }}
      </div>
      <div>
        <input class="post-main__comment" type="text" v-model="commentBody" />
        <button class="btn btn-secondary" @click="createComment(post.id)">
          Commenter
        </button> -->
  </div>
</template>

<script>
import postService from "../services/postService";
export default {
  data() {
    return {
      post: {},
      body: "",
    };
  },
  createComment() {},
  getAllComments() {},
  mounted() {
    postService.showPost(this.$route.params.postId).then((response) => {
      console.log(response.data);
      this.post = response.data.postDetails;
    });
  },
};
</script>

<style lang="scss" scoped></style>
