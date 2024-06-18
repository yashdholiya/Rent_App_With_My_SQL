const express = require("express");
const cartRoute = express.Router();

const  {addFavoriteToCart, getAllCart, getCart} = require("../../controller/user/cart.controller");
const verifyToken = require("../../helper/userToken");

cartRoute.post("/add",addFavoriteToCart);

cartRoute.get("/cart/all", getAllCart);

cartRoute.get("/cart", verifyToken, getCart);


module.exports = cartRoute;





// cartRoute.put("/cart/:id", updateCartItem);
