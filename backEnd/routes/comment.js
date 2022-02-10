const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.get("/", auth, commentCtrl);
router.post("/post/:id/comment", auth, commentCtrl.createComment);
router.get("/post/:id/comments", auth, commentCtrl.getAllComments);
router.put("/:id", auth, multer, commentCtrl);
router.delete("post/:id/delete/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;
