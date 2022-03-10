import axios from "axios";
import authHeader from "../services/authHeader";
const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    accept: "application/json",
    contentType: "application/json",
  },
});

export default {
  createPost() {
    // return instance.post("/post/create");
  },
  showAllPosts() {
    return instance.get("/posts", { headers: authHeader() });
  },
  showPost(postId) {
    return instance.get("/post/" + postId, { headers: authHeader() });
  },
  getUserPost(id) {
    return instance.get("/post/" + id, { headers: authHeader() });
  },
  updatePost() {
    return instance.update();
  },

  //   deletePost(id) {},
};
