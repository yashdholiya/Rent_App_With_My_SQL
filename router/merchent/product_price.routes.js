const express = require("express");
const productPriceRoute = express.Router();
const { addPrice, getAllProductPrice, UpdateProductPrice } = require("../../controller/merchent/product_price.controller");


productPriceRoute.post("/add/:product_id",addPrice);

productPriceRoute.get("/get-all",getAllProductPrice);

productPriceRoute.put("/update/:product_id",UpdateProductPrice);


module.exports = productPriceRoute;