const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/auth");

router.post("/loginUser", UserController.loginUser);
router.post("/me", auth, UserController.me);
router.put("/signUpUser", UserController.signUpUser);
router.delete("/deleteUser", UserController.deleteUser);

module.exports = router;
