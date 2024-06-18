const express = require("express");
const ordersummeryrouter = express.Router();
const {
  getOrderSummery,
  getAllOrderSummery,
} = require("../../controller/merchent/order_summery.controller");
const verifyToken = require("../../helper/userToken");

ordersummeryrouter.post("/order-summary", getOrderSummery);

ordersummeryrouter.get("/all-order-summary", getAllOrderSummery);

module.exports = ordersummeryrouter;
