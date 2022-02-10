const db = require("../models");
const Post = db.post;

// Create new post
exports.create = (req, res, next) => {
  try {
    const title = req.body.title;
    const body = req.body.body;
    const attachment = req.body.attachment;

    // Create post object
    const newPost = await Post.create({
      title,
      body,
      attachment,
    });
    if (!newPost.title) {
      throw new Error("Votre publication doit avoir un titre");
    }
    if (!newPost.body) {
      throw new Error("Votre publication doit contenir du texte");
    }
    res.status(200).send({ message: "Publication postée !" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erreur lors de la création de la publication",
    });
  }
};

// Get all Posts by title
exports.getPostByTitle = async (req, res, next) => {
  try {
    // Make a query to DB for the title and pass it as a condition for the findAll() method
    const title = req.query.title;
    const postsToFind = await Post.findAll({
      where: {
        title,
      },
    });
    if (!postsToFind) {
      throw new Error("Aucune publication disponible");
    }
    res.status(200).send({ message: postsToFind });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erreur lors de la recherche des publications",
    });
  }
};

// Update Post via ID
exports.updatePostById = (req, res, next) => {
  try {
    const id = req.params.id;
    const postUpdate = await Post.update(req.body, {
      where: { id },
    });
    if (!postUpdate) {
      throw new Error("Erreur lors de la modification de la publication");
    }
    if (num == 1) {
      res.send({ message: "Votre publication a été mise à jour" });
    } else {
      res.send({
        message: `Impossible de modifier la publication avec l'ID : ${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        `Impossible de modifier la publication avec ID : ${id}`,
    });
  }
};

// Delete a post by Id
exports.deletePostById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const postDelete = await Post.destroy({
      where: {
        id,
      },
    });
    if (!postDelete) {
      throw new Error("Aucune publication à supprimer");
    }
    if (num === 1) {
      res.status(200).send({ message: "Publication supprimée" });
    } else {
      res
        .status(400)
        .send({ message: "Erreur lors de la suppression du post" });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Erreur lors de la recherche de la publication à supprimer",
    });
  }
};
