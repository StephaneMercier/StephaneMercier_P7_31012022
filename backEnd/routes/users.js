const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/users");

router.post("/signup", userCtrl.signUp);
router.post("/login", userCtrl.logIn);
router.get("/user/profile/:id", auth, userCtrl.getUser);
router.get("/users", auth, userCtrl.getAllUsers);
router.put("/user/update/:id", auth, userCtrl.updateUser);
router.delete("/user/delete/:id", auth, userCtrl.deleteUser);

module.exports = router;
