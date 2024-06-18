const cartServices = require("../../services/user/cart.service");
const cartService = new cartServices();

exports.addFavoriteToCart = async (req, res) => {
  try {
    const { favoriteId , quantity } = req.body;
    const result = await cartService.addFavoriteToCart(favoriteId ,quantity);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllCart = async (req, res) => {
  try {
    const result = await cartService.getAllCart();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getCart = async (req, res) => {
  const userId = req.userId;
  try {
    const result = await cartService.getCart(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
