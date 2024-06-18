const express = require("express");
const categoryRoutr = express.Router();

const {
  addCategoriy,
  getCatogery,
  deleteCatoger,
  getSpecificCAtogery,
  updateCategory,
  getAllCatogeryWithMerchantToken,
} = require("../../controller/merchent/category.controller");
const verifyToken = require("../../helper/adminToken");

categoryRoutr.post("/add", verifyToken, addCategoriy);

categoryRoutr.get("/getAll", getCatogery);

categoryRoutr.delete("/delete/:id", deleteCatoger);

categoryRoutr.get("/getSpecific/:id", getSpecificCAtogery);

categoryRoutr.put("/update/:id", updateCategory);

categoryRoutr.get("/getWithTokne",verifyToken,getAllCatogeryWithMerchantToken);

module.exports = categoryRoutr;
