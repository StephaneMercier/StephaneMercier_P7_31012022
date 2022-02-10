const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/user/profile/:id", userCtrl.findOne);
router.get("/users", userCtrl.findAll);
router.put("/user/update/:id", userCtrl.update);
router.delete("user/delete/:id", userCtrl.delete);

module.exports = router;
