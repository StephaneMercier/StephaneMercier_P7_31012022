const { Comment, User } = require("../models");

// Create Comment
exports.createComment = async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      body: req.body.body,
      userId: req.user.id,
      postId: req.post.id,
    });
    if (!newComment) {
      throw new Error("Unable to post this comment");
    }
    res.status(201).json({ message: "Successfully commented on this post" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Delete comment
exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const commentToDelete = await Comment.destroy({ where: { id } });
    if (!commentToDelete) {
      throw new Error("Unable to delete this comment");
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
