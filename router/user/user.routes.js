const express = require("express");
const urouter = express.Router();

const { upload } = require("../../helper/imageUpdate");
const verifyToken = require("../../helper/userToken");
const {
  registerUser,
  updateUser,
  updatePassword,
  getUserProfile,
  loginUser,
  searchAndFilter,
  getProductsByPriceRange,
  getTrendingProducts,
} = require("../../controller/user/user.controller");

urouter.post("/register", upload.single("profileImage"), registerUser);

urouter.post("/login", loginUser);

urouter.put("/update", verifyToken, upload.single("profileImage"), updateUser);

urouter.post("/update-password", verifyToken, updatePassword);

urouter.get("/profile", verifyToken, getUserProfile);

urouter.get("/serch", searchAndFilter);

urouter.get("/price-range", getProductsByPriceRange);

urouter.get("/trending-products", getTrendingProducts);

module.exports = urouter;
