const favoriteServices = require("../../services/user/favorite.service");
const favoriteService = new favoriteServices();

// ADD FAVORITE
exports.addFavorite = async (req, res) => {
    const userId = req.userId;
    const { product_id } = req.body;
  
    try {
      const result = await favoriteService.addFavorite(userId, product_id);
      console.log(result);
      res.json({
        success: true,
        message: "Product added to favorites successfully",
        favorite: result,
      });
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  // GET FAVORITE USING USER TOKEN
  exports.getFavorites = async (req, res) => {
    const userId = req.userId; 
  
    try {
      const favorites = await favoriteService.getFavoritesByUserId(userId);
      res.json({ success: true, favorites });
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  // GET ALL FAVORITE
  exports.getAllFavorites = async (req, res) => {
    try {
      const favorites = await favoriteService.getAllFavorites();
      console.log(favorites);
      res.json({ success: true, favorites });
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  // UPDATE FAVORITE
  exports.updateFavorite = async (req, res) => {
    const { favoriteId, userId, productId } = req.body;
  
    try {
      const result = await favoriteService.updateFavorite(
        favoriteId,
        userId,
        productId
      );
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // DELETE FAVORITE
  exports.deleteFavorite = async (req, res) => {
    const id  = req.params.id;
    try {
      const result = await favoriteService.deleteFavorite(id);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  