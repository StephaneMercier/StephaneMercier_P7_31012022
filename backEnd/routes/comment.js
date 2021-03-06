const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comments");
const auth = require("../middleware/auth");

router.post("/post/:postId/comments", auth, commentCtrl.createComment);
router.delete("/comments/:id/delete", auth, commentCtrl.deleteComment);

module.exports = router;
