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
  getUser(id) {
    return instance.get("/user/profile/" + id, { headers: authHeader() });
  },
  getUsers() {
    return instance.get("/users", { headers: authHeader() });
  },
  deleteProfile(id) {
    return instance.delete("/user/delete/" + id, { headers: authHeader() });
  },
  createPost() {
    return instance.post("/post/create", { headers: authHeader() });
  },
  getUserPost(id) {
    return instance.get("/post/user/" + id, { headers: authHeader() });
  },
  getAllPosts(id) {
    return instance.get("/posts" + id, { headers: authHeader() });
  },
  deleteUserPost(id) {
    return instance.delete("/post/delete/" + id, { headers: authHeader() });
  },
  deleteUser(id) {
    return instance.delete("/user/delete/" + id, { headers: authHeader() });
  },
};
