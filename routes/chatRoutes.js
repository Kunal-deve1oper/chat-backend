const express = require("express");
const { createChat, fetchChats } = require("../controllers/chatControllers");
const auth = require("../middleware/authMiddleware");


const router = express.Router();

router.route("/create").post(auth,createChat);
router.route("/").get(auth,fetchChats);

module.exports = router;