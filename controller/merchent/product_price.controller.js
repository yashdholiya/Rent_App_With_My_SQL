const productPriceServices = require("../../services/merchent/product_price.service");
const productPriceService = new productPriceServices();

exports.addPrice = async (req, res) => {
  const product_id = req.params.product_id;
  const { week_price, month_price, deposite } = req.body;
  try {
    const result = await productPriceService.addPrice(
      product_id,
      week_price,
      month_price,
      deposite
    );
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

exports.getAllProductPrice = async (req, res) => {
  try {
    const result = await productPriceService.getAllProductPrice();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};
exports.UpdateProductPrice = async (req, res) => {
  const product_id = req.params.product_id;
  const { week_price, month_price, deposite } = req.body;
  try {
    const result = await productPriceService.UpdateProductPrice(
      product_id,
      week_price,
      month_price,
      deposite
    );
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};
