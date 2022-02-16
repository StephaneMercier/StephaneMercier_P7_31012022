const db = require("../models");
const Comment = db.comment;
const User = db.user;

exports.createComment = async (req, res, next) => {
  try {
    const comment = req.body.body;
    const newComment = await Comment.create({
      comment,
      userId: req.user.id,
      postId: req.params.id,
    });
    if (!newComment) {
      res.status(404).send({ message: "Commentaire impossible" });
    }
    res.status(201).send({ message: "Commentaire publié" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Echec de la création du commentaire",
    });
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    //   Getting all values from DB_MYSQL

    const allComments = await Comment.findAll({
      // Getting all attributes from Comment model
      attributes: ["id", "body", "userId", "postId", "createdAt", "updatedAt"],
      where: { postId: req.params.id },
      //   Getting user Id to associate to the comment
      include: [{ model: User, attributes: ["name", "lastName"] }],
    });
    if (!allComments) {
      throw new Error("Aucun commentaire trouvé pour cette publication");
    }
    res.status(200).send({ message: allComments });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Impossible de retrouver les commentaires pour cette publication",
    });
  }
};

exports.updateComment = async (req, res, next) => {};

exports.deleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const commentToDestroy = await Comment.findOne({
      attributes: ["id", "postId"],
      where: {
        id,
      },
    });
    if (!commentToDestroy) {
      throw new Error("Aucun commentaire à supprimer");
    }
    await Comment.destroy({
      where: { id },
    });
    res.status(200).send({ message: "Commentaire supprimé" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
