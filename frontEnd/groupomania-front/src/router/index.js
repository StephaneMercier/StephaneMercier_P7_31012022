import { createRouter, createWebHistory } from "vue-router";
import Feed from "../views/Feed";
import Profile from "../views/Profile";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Post from "../views/Post.vue";
import UpdatePost from "../views/UpdatePost.vue";
import Admin from "../views/Admin.vue";
import userService from "../services/userService";

// Récupération du token pour le beforeEach
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

  {
    path: "/feed",
    name: "Feed",
    component: Feed,
    beforeEnter: (to, from, next) => {
      if (!checkToken()) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!checkToken()) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/post/:postId",
    name: "DisplayPost",
    component: Post,
    beforeEnter: (to, from, next) => {
      if (!checkToken()) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/post/edit/:postId",
    name: "PostEdit",
    component: UpdatePost,
    beforeEnter: (to, from, next) => {
      if (to.name !== "Login" && !checkToken()) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    beforeEnter: (to, from, next) => {
      const getToken = localStorage.getItem("token");
      const { id } = JSON.parse(getToken);
      userService.getUser(id).then((response) => {
        if (response.data.userFound.isAdmin) {
          next();
        } else {
          next({ name: "Profile" });
        }
      });
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   if (to.name == "Register") next({ name: "Register" });
//   else next();
// });

// router.beforeEach(async (to, from, next) => {
//   if (to.name == "Login" && checkToken()) next({ name: "Profile" });
//   else next();
// });

export default router;
