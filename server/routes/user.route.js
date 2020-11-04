const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.route("/google").post(userController.google);
router.route("/facebook").post(userController.facebook);
router.route("/form").post(userController.form);

module.exports = router;
