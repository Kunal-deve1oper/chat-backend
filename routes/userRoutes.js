const express = require("express");
const { registerUser, loginUser, allUser } = require("../controllers/userControllers");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(auth, allUser);

module.exports = router;