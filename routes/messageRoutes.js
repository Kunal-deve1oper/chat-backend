const express = require("express");
const { sendMessage, getMessage } = require("../controllers/messageControllers");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(auth,sendMessage);
router.route("/:chatId").get(auth,getMessage);

module.exports = router;