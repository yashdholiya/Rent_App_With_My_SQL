const express = require("express");
const shipingAddressRoute = express.Router();
const {
  createAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
} = require("../../controller/user/shipping_address.controller");
const verifyToken = require("../../helper/userToken");

shipingAddressRoute.post("/add-shipping", verifyToken, createAddress);

shipingAddressRoute.get("/get-all", getAllAddress);

shipingAddressRoute.put("/update", verifyToken, updateAddress);

shipingAddressRoute.delete("/delete", deleteAddress);

module.exports = shipingAddressRoute;
