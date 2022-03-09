import { createRouter, createWebHashHistory } from "vue-router";
import Feed from "../views/Feed";
import Home from "../views/Home";
import Profile from "../views/Profile";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";

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
  { path: "/", name: "Home", component: Home },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
    // Protection des routes si le token n'existe pas
    beforeEnter: (to, from, next) => {
      if (!checkToken()) {
        next({ path: "/login" });
        // Si token présent, redirection vers la route demandée
      } else {
        next();
      }
    },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!checkToken()) {
        next({ path: "/login" });
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
