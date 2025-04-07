const express = require('express')
const router = express.Router();

const categoryController = require('../controller/category');

router.post('/addCategory',categoryController.addCategory);
router.get('/getCategories',categoryController.getCategories);
router.delete('/deleteCategory/:id',categoryController.deleteCategory);
router.get('/getProductsByCategory/:category',categoryController.getProductsByCategory);
router.get('/getEachproduct/:prodId',categoryController.getEachProduct);



module.exports=router;