const express = require("express");
const server = express();
const mysql = require("mysql2/promise");
const path = require("path");
const fs = require("fs");
const urouter = require("./router/user/user.routes");
const arouter = require("./router/merchent/admin.routes");
const categoryRoutr = require("./router/merchent/category.routes");
const productRoute = require("./router/merchent/product.routes");
const favoriteRoute = require("./router/user/favorite.routes");
const cartRoute = require("./router/user/cart.routes");
const productPriceRoute = require("./router/merchent/product_price.routes");
const orderRouter = require("./router/user/order.routes");
const shipingAddressRoute = require("./router/user/shipping_address.routes");
const paymentRouter = require("./router/user/payment.routes");
const ordersummeryrouter = require("./router/merchent/order_summery.routes");
const ordermerchentroute = require("./router/merchent/order.routes");

const PORT = process.env.PORT || 2828;

const imagePath = path.join(__dirname, "public", "images");
const profileImagePath = path.join(imagePath, "profileImage");

if (!fs.existsSync(profileImagePath)) {
  fs.mkdirSync(profileImagePath, { recursive: true });
}
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/public/images", express.static(imagePath));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "project_job_app",
});
global.db = db;

server.use("/api/user", urouter);
server.use("/api/admin", arouter);
server.use("/api/category", categoryRoutr);
server.use("/api/product", productRoute);
server.use("/api/favorite", favoriteRoute);
server.use("/api/cart", cartRoute);
server.use("/api/order", orderRouter);
server.use("/api/productPrice", productPriceRoute);
server.use("/api/shipping", shipingAddressRoute);
server.use("/api/payment", paymentRouter);
server.use("/api/order/summery", ordersummeryrouter);
server.use("/api/order/merchent", ordermerchentroute);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
