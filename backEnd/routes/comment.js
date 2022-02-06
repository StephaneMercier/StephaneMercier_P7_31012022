const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.get("/", auth, commentCtrl);
router.post("/", auth, multer, commentCtrl);
router.get("/:id", auth, commentCtrl);
router.put("/:id", auth, multer, commentCtrl);
router.delete("/:id", auth, commentCtrl);
