const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comments");
const auth = require("../middleware/auth");

router.post("/post/:id/comment", auth, commentCtrl.createComment);
router.delete("post/:id/delete/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;
