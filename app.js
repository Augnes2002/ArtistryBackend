const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.json());
const db = require("./util/database");

const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const userAdminRoutes = require("./routes/user.admin.routes");
const categoryRoutes = require("./routes/category.routes");
const cartRoutes = require("./routes/cart.routes");
const addressRoutes = require("./routes/checkOut.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const orderRoutes = require("./routes/order.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const loginRoutes = require("./controller/adminLogin");


app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use(
  "/admin/users",
  (req, res, next) => {
    console.log("aduser");
    next();
  },
  userAdminRoutes
);
app.use("/category", categoryRoutes);
app.use("/cart",cartRoutes);
app.use("/checkout",addressRoutes);
app.use("/wishlist",wishlistRoutes);
app.use("/order",orderRoutes);
app.use("/dashboard",dashboardRoutes);
app.use("/login", loginRoutes);

app.listen(3000, () => {
  console.log("Server running on 3000 port");
});
