import { createRouter, createWebHashHistory } from "vue-router";
import Feed from "../views/Feed";
import Home from "../views/Home";
import Profile from "../views/Profile";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";

const routes = [
  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login },
  { path: "/", name: "Home", component: Home },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
