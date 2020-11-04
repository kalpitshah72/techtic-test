const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.route("/google").post(userController.google);
router.route("/facebook").post(userController.facebook);

module.exports = router;
