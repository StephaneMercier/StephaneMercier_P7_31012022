const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/posts");

router.post("/post/create", auth, multer, postCtrl.createPost);
router.get("/posts", auth, postCtrl.getAllPosts);
router.get("/post/:id", auth, postCtrl.getUserPost);
router.put("/post/update/:id", auth, multer, postCtrl.updatePost);
router.delete("/post/delete/:id", auth, postCtrl.deletePost);

module.exports = router;
