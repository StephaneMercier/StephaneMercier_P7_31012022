const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl);
router.post("/", auth, multer, postCtrl);
router.get("/:id", auth, postCtrl);
router.put("/:id", auth, multer, postCtrl);
router.delete("/:id", auth, postCtrl);
