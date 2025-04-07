const express = require("express");
const router = express.Router();
const multer = require("multer");

const adminController = require("../controller/admin");
const loginController = require("../controller/adminLogin");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
  });
const upload = multer({ storage }).fields([
    { name: "productImage", maxCount: 1 },
    { name: "artistImage", maxCount: 1 },
  ]);

router.post("/addProduct",upload, adminController.addProduct);
router.put("/updateProduct/:id",(req,res,next)=>{console.log(req.body);next()},adminController.postUpdateProduct);
router.get("/getProducts", adminController.getProducts);
router.get("/getProduct/:id",adminController.getProduct);
router.delete("/deleteProduct/:id",adminController.deleteProduct);


module.exports = router;
