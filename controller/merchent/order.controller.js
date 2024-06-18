const orderMerchentServices = require("../../services/merchent/order.service");
const orderMerchentService = new orderMerchentServices();

exports.placedOrder = async (req, res) => {
  try {
    const result = await orderMerchentService.placedOrder();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.pendingOrder = async (req, res) => {
    try {
      const result = await orderMerchentService.pendingOrder();
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  exports.successOrder = async (req, res) => {
    try {
      const result = await orderMerchentService.successOrder();
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

  exports.getAllOrder = async (req, res) => {
    try {
      const result = await orderMerchentService.getAllOrder();
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
