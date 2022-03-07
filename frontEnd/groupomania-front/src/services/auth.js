import axios from "axios";
const axios = require("axios").default;
const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

class AuthService {
  async signup() {
    try {
      return instance.post("/register", {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
    } catch (e) {
      console.log({ message: e.message });
    }
  }
  async login(user) {
    const res = await instance.post("/login", {
      email: user.email,
      password: user.password,
    });
    if (res.data.tokenConnection) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  }
  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
