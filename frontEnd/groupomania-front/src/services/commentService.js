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
  createComment(postId, body) {
    const userId = getUserId();
    console.log("userId du commentaire : ", userId);
    return instance.post(
      "/post/" + postId + "/comments",
      { userId, postId, body },
      {
        headers: authHeader(),
      }
    );
  },
  deleteComment(postId, id) {
    return instance.delete("/post/" + postId + "/delete/comments/" + id, {
      headers: authHeader(),
    });
  },
};
