const userController = require("../controller/user");
const express = require("express");
const router = express.Router();

router.post("/registration", userController.userRegistration);
router.post("/login",userController.login);

module.exports = router;
