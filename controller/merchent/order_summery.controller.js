const orderSummeryService = require("../../services/merchent/order_summery.service");
const orderSummeryServic = new orderSummeryService();

exports.getOrderSummery = async (req, res) => {
  try {
    const order_id = req.body.order_id;

    const orderSummary = await orderSummeryServic.getOrderSummary(order_id);

    if (!orderSummary) {
      return res.status(404).json({ message: "No order found for the user" });
    }

    res.json(orderSummary);
  } catch (error) {
    console.error("Error fetching order summary:", error);
    res.status(500).json({
      message: "Error fetching order summary",
      error: error.message,
    });
  }
};

exports.getAllOrderSummery = async (req, res) => {
  try {
    const orderSummary = await orderSummeryServic.getAllOrderSummary();
    res.json(orderSummary);
  } catch (error) {
    console.error("Error fetching all order summary:", error);
    res.status(500).json({
      message: "Error fetching all order summary",
      error: error.message,
    });
  }
};
