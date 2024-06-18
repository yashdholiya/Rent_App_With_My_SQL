const express = require("express");
const productRoute = express.Router();
const { upload } = require("../../helper/imageUpdate");
// const verifyToken = require("../../helpers/admintoken");
const {
  addProduct,
  updateProduct,
  getAllProduct,
  getProductByAdminId,
  deleteProductWithId,
} = require("../../controller/merchent/product.contrroller");

productRoute.post("/add", upload.single("productImage"), addProduct);

productRoute.get("/single-product/:adminId", upload.none(), getProductByAdminId);

productRoute.get("/product/all", upload.none(), getAllProduct);

productRoute.delete("/delete/:id", deleteProductWithId);

productRoute.put("/update/:id", upload.single("productImage"), updateProduct);

module.exports = productRoute;
