const express=require('express');
const router = express.Router();
const {authMiddleware}=require('../auth')
const checkOutController = require("../controller/checkout");


router.post("/addAddress",authMiddleware,checkOutController.addAddress);
router.get("/getAddress",authMiddleware,checkOutController.getAddress);

module.exports = router;