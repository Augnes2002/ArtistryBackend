const express = require("express");
const router = express.Router();

const userAdminController = require("../controller/user.admin");
router.get("/getUsers",userAdminController.getUsers);


module.exports = router;