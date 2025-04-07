const express = require('express');
const router = express.Router();
const {authMiddleware}=require('../auth')
const cartController = require('../controller/cart');

router.post('/addToCart',authMiddleware,cartController.addToCart);
router.get('/getFromCart',authMiddleware,cartController.getCartDetails);
router.delete('/remove',authMiddleware,cartController.removeCart);





module.exports=router;