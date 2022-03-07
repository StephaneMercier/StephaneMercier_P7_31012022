const userRoute = require("../routes/users");
const postRoute = require("../routes/post");
const commentRoute = require("../routes/comment");

const express = require("express");
const router = express.Router();

router.use(userRoute);
router.use(postRoute);
router.use(commentRoute);

// PETIT COQUIN ! <3

module.exports = router;
