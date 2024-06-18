const express = require("express");
const orderRouter = express.Router();
const { createOrder } = require("../../controller/user/order.controller");
const verifyToken = require("../../helper/userToken");

orderRouter.post("/create-order",verifyToken,createOrder);


module.exports= orderRouter