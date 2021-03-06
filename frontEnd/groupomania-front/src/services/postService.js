import axios from "axios";
import authHeader from "../services/authHeader";
const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    accept: "application/json",
    contentType: "application/json",
  },
});

function getUserId() {
  const getToken = localStorage.getItem("token");
  const { id } = JSON.parse(getToken);
  return id;
}

export default {
  createPost(postTitle, postBody) {
    const userId = getUserId();
    return instance.post(
      "/post/create",
      { userId, title: postTitle, body: postBody },
      { headers: authHeader() }
    );
  },
  showAllPosts() {
    return instance.get("/posts", { headers: authHeader() });
  },
  showPost(postId) {
    return instance.get("/post/" + postId, { headers: authHeader() });
  },
  getUserPost(id) {
    return instance.get("/post/user/" + id, { headers: authHeader() });
  },
  updatePost(postId, postTitle, postBody) {
    return instance.put(
      "/post/update/" + postId,
      { title: postTitle, body: postBody },
      { headers: authHeader() }
    );
  },

  deletePost(id) {
    return instance.delete("/post/delete/" + id, { headers: authHeader() });
  },
};
