const db = require("../models/Post");
const Post = db.Post;
const Op = db.Sequelize.Op;

exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    throw "Votre post a besoin d'un titre !";
  }
};
exports.getPost = (req, res, next) => {};
exports.getAllPosts = (req, res, next) => {};
exports.updatePost = (req, res, next) => {};
exports.deletePost = (req, res, next) => {};
