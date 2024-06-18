
const express = require("express");
const paymentRouter = express.Router();
const {
  createPayment,
  getAllPayment,
  getSpecificPayment,
} = require("../../controller/user/payment.controller");

paymentRouter.post("/payments", createPayment);

paymentRouter.get("/getAllPatment", getAllPayment);

paymentRouter.get("/getSpecific/:id", getSpecificPayment);

module.exports = paymentRouter;
