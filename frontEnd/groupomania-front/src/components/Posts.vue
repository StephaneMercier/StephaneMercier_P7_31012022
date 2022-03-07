<template>
  <div class="row">
    <div class="col-9">
      <form class="container mb-5">
        <textarea
          v-model="body"
          maxlength="255"
          class="form-control"
          rows="3"
          placeholder="Qu'avez-vous à partager"
        ></textarea>
        <div class="mar-top clearfix">
          <button @click="publishPost()" class="btn btn-share">Publier</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import auth from "../services/auth";
import userService from "../services/user";
import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:3000" });
export default {
  name: "Posts",
  data() {
    return {
      posts: [],
      body: "",
      changes: 0,
    };
  },
  beforeMount() {
    this.getAllPosts();
  },
  methods: {
    publishPost() {
      if (this.body != "") {
        try {
          instance.post(
            "/post/create",
            { body: this.body },
            { headers: { Authorization: "Bearer" + this.$auth.accessToken } }
          );
        } catch (e) {
          console.log({ message: e.message });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
