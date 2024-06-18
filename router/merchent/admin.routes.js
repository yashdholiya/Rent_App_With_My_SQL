const express = require("express");
const arouter = express.Router();

const { registerAdmin, loginAdmin, getAdminProfile, updateAdmin }= require("../../controller/merchent/admin.controller");
const verifyToken = require("../../helper/adminToken");
const { upload} = require("../../helper/imageUpdate");

arouter.post("/register", upload.single("profileImage"),registerAdmin);

arouter.post("/login", loginAdmin);

arouter.get("/profile", verifyToken, getAdminProfile);

arouter.put("/update",verifyToken,upload.single("profileImage"),updateAdmin);

module.exports = arouter;
