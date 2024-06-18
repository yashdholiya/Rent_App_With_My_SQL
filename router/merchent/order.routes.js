const express = require("express");
const ordermerchentroute = express.Router();
const {
  placedOrder,
  pendingOrder,
  successOrder,
  getAllOrder,
} = require("../../controller/merchent/order.controller");

ordermerchentroute.get("/plced-order", placedOrder);

ordermerchentroute.get("/pending-order", pendingOrder);

ordermerchentroute.get("/success-order", successOrder);

ordermerchentroute.get("/all-order", getAllOrder);


module.exports = ordermerchentroute;
