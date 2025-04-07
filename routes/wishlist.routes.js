const wishlistController = require('../controller/wishList');
const {authMiddleware} = require('../auth');

const express = require('express');
const router= express.Router();


router.post("/addToWishlist",authMiddleware,wishlistController.addToWishlist);
router.get("/getWishlistProducts",authMiddleware,wishlistController.getWishlistDetails);
router.delete("/removeWishlistProduct",authMiddleware,wishlistController.removeFromWishList);

module.exports = router;