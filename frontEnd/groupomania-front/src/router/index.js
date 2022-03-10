import { createRouter, createWebHashHistory } from "vue-router";
import Feed from "../views/Feed";
// import Home from "../views/Home";
import Profile from "../views/Profile";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Post from "../views/Post.vue";
import UpdatePost from "../views/UpdatePost.vue";

// Récupération du token pour le beforeEnter
function checkToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return token;
}
const routes = [
  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login },
  // { path: "/", name: "Home", component: Home },
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
  {
    path: "/post/:postId",
    name: "DisplayPost",
    component: Post,
  },
  {
    path: "/post/edit/:postId",
    name: "PostEdit",
    component: UpdatePost,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  if (to.name !== "Login" && !checkToken()) next({ name: "Login" });
  if (to.name == "Login" && checkToken()) next({ name: "Profile" });
  else next();
});

export default router;
