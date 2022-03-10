import axios from "axios";
const TOKEN_KEY = "token";
const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    accept: "application/json",
    contentType: "application/json",
  },
});

export default {
  signUp(name, lastName, email, password) {
    return instance.post("/signup", { name, lastName, email, password });
  },
  logIn(email, password) {
    return instance.post("/login", { email, password });
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },
};
