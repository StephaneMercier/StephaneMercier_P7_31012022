const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Sign up
exports.signup = async (req, res, next) => {
  const params = req.body;
  const userName = params.name;
  const userLastName = params.lastName;
  const userEmail = params.email;
  const userPwd = params.password;
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const pwdRegex =
    /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

  // User already in DB
  const alreadyInUse = await User.findOne({
    attributes: ["email"],
    where: { email },
  });

  // New User
  const newUser = await User.create({
    email: userEmail,
    password: await bcrypt.hash(userPwd, 10),
    name: userName,
    lastName: userLastName,
  });

  // Get Token
  const jwbToken =
    "Bearer " +
    jwt.sign({ id: newUser.id }, "JSON_TOKEN", { expiresIn: "24H" });

  try {
    if (!userName && !userLastName && !userEmail && !userPwd) {
      throw new Error("Veuillez remplir les champs pour l'inscription");
    }
    if (!regexEmail.test(userEmail)) {
      throw new Error("Format de l'e-mail Invalide");
    }
    if (!pwdRegex.test(userPwd)) {
      throw new error(
        "Le mot de passe doit contenir au moins: 8 caractères - 1 lettre minuscule - 1 lettre majuscule - 1 chiffre - 1 caractère spécial"
      );
    }
    if (alreadyInUse) {
      throw new Error(
        "Vous êtes déjà inscrit, cliquez sur 'Connexion' pour accéder à l'application"
      );
    }
    if (!newUser) {
      throw new Error("Erreur lors de votre inscription");
    }
    if (!jwbToken) {
      throw new Error("Erreur lors de la génération du token");
    }
    res.status(201).send({ message: "Utilisateur crée !" });
  } catch (error) {
    res.status(400).send({ message: "Erreur lors de l'inscription" });
  }
};

// Logging in
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const userLogged = await User.findOne({ where: { email } });
    const validPassword = await bcrypt.compare(
      req.body.password,
      userLogged.password
    );
    const connectToken = jwt.sign(
      { id: userLogged.id },
      process.env.JSON_TOKEN,
      { expiresIn: "24H" }
    );

    if (!userLogged) {
      throw new Error("Le compte n'existe pas avec ces identifiants");
    }
    if (!validPassword) {
      throw new Error("Mot de passe incorrect'");
    }
    if (!connectToken) {
      throw new Error("Token non distribué");
    }
  } catch (error) {
    res.status(400).send({ message: "Erreur lors de la connexion au compte" });
  }
};

// Create new User
exports.create = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Le nom est requis pour vous inscrire" });
    return;
  }

  const user = {
    name: req.body.name,
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
  };

  // Add user to DB
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message && "Impossible de créer cet Utilisateur",
      });
    });
};

// Get All Users
exports.findAll = (req, res, next) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%{name}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message && "Impossible de retrouver les utilisateurs",
      });
    });
};

// Get User with Id
exports.findOne = (req, res, next) => {
  const userId = req.params.id;

  // Use findByPk to get userId with the primaryKey
  User.findByPk(userId)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `L'utilisateur avec l'ID = ${userId} n'a pas été trouvé`,
        });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Impossible de trouver l'utilisateur " + userId });
    });
};

// Update User profile
exports.update = (req, res, next) => {
  const userId = req.params.id;

  User.update(req.body, {
    where: { userId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Votre Profil a bien été changé" });
      } else {
        res.send({ message: "Erreur pendant la mis à jour de votre profil" });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Impossible de mettre à jour le profil ID : " + userId,
      });
    });
};

// Delete User profile
exports.delete = (req, res, next) => {
  const userID = req.params.id;

  // User.destroy to delete the table in DB
  User.destroy({ where: { userID } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "utilisateur Supprimé de la base de donnees",
        });
      } else {
        res.send({
          message: "Impossible de supprimer l'utilisateur ID : " + userID,
        });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: `Impossible de supprimer le profil ${userID}` });
    });
};
