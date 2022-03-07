import axios from "axios";
import authHeader from "./authHeader";
const axios = require("axios").default;
const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

class UserService {
  async create() {
    try {
      const response = await instance.post("/signup", {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      });
      console.log(response);
    } catch (e) {
      console.log({ message: e.message });
    }
  }
  async login() {
    try {
      const response = await instance.post(
        "/login",
        {
          email: this.email,
          password: this.password,
        },
        { headers: authHeader() }
      );
      console.log(response);
    } catch (e) {
      console.log({ message: e.message });
    }
  }
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
  //   update(userId) {}
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
