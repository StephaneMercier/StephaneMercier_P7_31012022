const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");

router.post("/post/create", auth, multer, postCtrl.create);
router.get("/posts", auth, postCtrl.getPostByTitle);
router.get("/:id", auth, postCtrl);
router.put("/post/update/:id", auth, multer, postCtrl.updatePostById);
router.delete("/post/delete/:id", auth, postCtrl.deletePostById);

module.exports = router;
