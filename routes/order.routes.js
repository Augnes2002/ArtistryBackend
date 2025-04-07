const express= require('express');
const router= express.Router();
const orderController= require('../controller/order');
const {authMiddleware}= require('../auth');

router.post('/createOrder',authMiddleware,orderController.createOrder);
router.post('/verifyPayment',authMiddleware,orderController.verifyPayment);
router.get('/myOrders',authMiddleware,orderController.getMyOrders);
router.get('/orderDetails/:id',authMiddleware,orderController.getOrderById);
router.get('/getAllOrders',orderController.getAllOrders);

module.exports = router;