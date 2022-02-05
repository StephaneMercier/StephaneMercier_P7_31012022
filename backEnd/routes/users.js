module.exports = (app) => {
  const userCtrl = require("../controllers/users");
  const auth = require("../middleware/auth");
  const express = require("express");
  const router = express.Router();

  router.post("/users", userCtrl.signUp);
  router.post("/users", userCtrl.login);

  //   Route de l'ajout d'un utilisateur
  router.post("/users", auth, userCtrl.create);

  //   Tous les utilisateurs
  router.get("/users", auth, userCtrl.findAll);

  //   Un seul utilisateurs
  router.get("/users", auth, userCtrl.findOne);

  //   MàJ Utilisateur
  router.put("/users", auth, userCtrl.update);

  //   SUpprimer un Utilisateur
  router.delete("/users", auth, userCtrl.delete);

  app.use("/users", auth, router);
};
