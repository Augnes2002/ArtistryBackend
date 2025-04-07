const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboard.admin");

router.get("/totalUsers",dashboardController.totalUsers);
router.get("/totalProducts",dashboardController.totalProducts);
router.get("/newJoinees",dashboardController.newJoinees);


module.exports= router;

