import axios from "axios";
import authHeader from "./authHeader";
const axios = require("axios").default;
const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

class UserService {
  getUser(id) {
    try {
      return instance.get("/user/profile/" + id, { headers: authHeader() });
    } catch (e) {
      console.log({ message: e.message });
    }
  }
  getUsers() {
    try {
      return instance.get("/users", { headers: authHeader() });
    } catch (e) {
      console.log({ message: e.message });
    }
  }
  //  delete(userId) {}
  deleteProfile(id) {
    try {
      return instance.delete("/user/delete/" + id, { headers: authHeader() });
    } catch (e) {
      console.log({ message: e.message });
    }
  }
  createPost() {
    try {
      return instance.post("/post/create", { headers: authHeader() });
    } catch (e) {
      console.log({ message: e.message });
    }
  }
  getUserPost(id) {
    try {
      return instance.get("/post/" + id, { headers: authHeader() });
    } catch (e) {
      console.log({ message: e.message });
    }
  }
  getAllPosts() {
    try {
      return instance.get("/posts" + id, { headers: authHeader() });
    } catch (e) {
      console.log({ message: e.message });
    }
  }
  deleteUserPost() {
    try {
      return instance.delete("/post/delete/" + id, { headers: authHeader() });
    } catch (e) {
      console.log({ message: e.message });
    }
  }
}

export default new UserService();
