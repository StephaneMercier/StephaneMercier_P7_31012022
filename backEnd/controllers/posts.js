const { User, Post } = require("../models");

// Create a Post
exports.createPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const params = req.body;
    const newPost = await Post.create({
      userId,
      body: params.body,
    });

    if (!newPost) {
      throw new Error("Unable to create this post");
    }
    res.status(200).json(newPost);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Get All Posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.findAll({});
    if (!allPosts) {
      throw new Error("Unable to retrieve all posts");
    }
    res.status(200).send({ allPosts });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Get post detail by postId
exports.showPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const postDetails = await Post.findOne({
      where: { id: postId },
    });
    if (!postDetails) {
      throw new Error("No post to display");
    }
    res.status(200).send({ postDetails });
  } catch (e) {
    console.log({ message: e.message });
  }
};

// Get post by userID
exports.getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("param userID", id);
    const userPosts = await Post.findAll({
      where: {
        userId: id,
      },
    });
    // const userPosts = await Post.findAll({ userId: id });
    if (!userPosts) {
      throw new Error("No Post related to this User were found");
    }
    res.status(200).send({ userPosts });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findPostToUpdate = await Post.update({ where: { id } });
    if (!findPostToUpdate) {
      throw new Error("No post found");
    }
    if (findPostToUpdate && findPostToUpdate.UserId !== req.user.id) {
      res.status(400).json({ message: e.message });
    }
    await findPostToUpdate.update({
      body: req.body.body,
      userId: req.user.id,
    });
    res.status(201).send({ postUpdate, message: "Post updated successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// delete a Post
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findPost = await Post.findOne({ where: { id } });
    if (
      (findPost && findPost.userId == req.user.id) ||
      req.user.isAdmin === true
    ) {
      Post.destroy({ where: { id: req.params.id } });
    }
    res.status(200).send({ message: "Successfully deleted the post" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
