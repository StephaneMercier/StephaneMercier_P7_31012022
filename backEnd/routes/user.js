module.exports = (app) => {
  const user = require("../controllers/user");
  var router = require("express").Router();

  //   Route de l'ajout d'un utilisateur
  router.post("/", user.create);

  //   Tous les utilisateurs
  router.get("/", user.findAll);

  //   Un seul utilisateurs
  router.get("/", user.findOne);

  //   MàJ Utilisateur
  router.put("/", user.update);

  //   SUpprimer un Utilisateur
  router.delete("/", user.delete);

  app.use("api/user", router);
};
