const orderMerchentServices = require("../../services/merchent/order.service");
const orderMerchentService = new orderMerchentServices();

exports.placedOrder = async (req, res) => {
  try {
    const { placesOrder, totalPlacesOrder } =
      await orderMerchentService.placedOrder();
    res
      .status(200)
      .json({ totalPlacesOrder: totalPlacesOrder, placesOrder: placesOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.pendingOrder = async (req, res) => {
  try {
    const { pandingOrder, totalPendingOrder } =
      await orderMerchentService.pendingOrder();
    console.log("hello....", pandingOrder, totalPendingOrder);
    res.status(200).json({
      totalPendingOrder: totalPendingOrder,
      pandingOrder: pandingOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.successOrder = async (req, res) => {
  try {
    const { successOrder, totalSuccessOrder } =
      await orderMerchentService.successOrder();
    res.status(200).json({
      totalSuccessOrder: totalSuccessOrder,
      successOrder: successOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const { orders, TotalAllOrder } = await orderMerchentService.getAllOrder();
    res.status(200).json({ TotalAllOrder: TotalAllOrder,
     orders: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
