const { User, Post, Comment } = require("../models");

// Create a Post
exports.createPost = async (req, res, next) => {
  try {
    const params = req.body;
    const newPost = await Post.create({
      UserId: params.userId,
      title: params.title,
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
    const allPosts = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });

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
      include: [{ model: Comment }],
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
    const userPosts = await Post.findAll({
      where: {
        userId: id,
      },
    });

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
    const { postId } = req.params;

    const findPostToUpdate = await Post.findOne({ where: { id: postId } });

    if (!findPostToUpdate) {
      throw new Error("No post found");
    }

    if (findPostToUpdate && findPostToUpdate.UserId != req.body.userId) {
      res.status(400).json({ message: "This post does not belong to you" });
    }

    await findPostToUpdate.update({
      title: req.body.title,
      body: req.body.body,
      userId: req.body.userId,
    });
    res.status(201).send({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a Post
exports.deletePost = async (req, res, next) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });

    res.status(200).send({ message: "Successfully deleted the post" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
