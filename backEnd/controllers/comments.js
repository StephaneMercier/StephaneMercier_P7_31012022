const { Comment } = require("../models");

// Create Comment
exports.createComment = async (req, res, next) => {
  try {
    // console.log("verif req.body", req.body);
    const newComment = await Comment.create({
      body: req.body.body,
      UserId: req.body.userId,
      PostId: req.body.postId,
    });
    // console.log(newComment);
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
    await Comment.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
