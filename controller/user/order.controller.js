const orderServices = require("../../services/user/order.service");
const orderService = new orderServices();

exports.createOrder = async (req, res) => {
  const userId = req.userId;
  const discount = req.body.discount || 0;
  const delivery_charge = req.body.delivery_charge || 0;
  const priceType = req.body.priceType || "week";

  try {
    const order = await orderService.createOrder(
      userId,
      discount,
      delivery_charge,
      priceType
    );
    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
