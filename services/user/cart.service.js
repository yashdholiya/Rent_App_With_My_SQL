module.exports = class cartServices {
  async addFavoriteToCart(favoriteId, quantity) {
    try {
      // Fetch the favorite item details
      const [favoriteItems] = await db.query(
        "SELECT * FROM favorite WHERE id = ?",
        [favoriteId]
      );

      // Check if the favorite item exists
      if (favoriteItems.length === 0) {
        const error = new Error("Favorite item not found");
        error.statusCode = 404;
        throw error;
      }

      const favoriteItem = favoriteItems[0];
      const { user_id, status } = favoriteItem;
      console.log("Favorite Item:", favoriteItem);

      // Check if the status is already 'cart'
      if (status === "add cart") {
        const error = new Error("Favorite item is already in the cart");
        error.statusCode = 400;
        throw error;
      }
      ``;

      // Insert the favorite item into the cart with the specified quantity
      const insertResult = await db.query(
        "INSERT INTO cart (favorite_id, user_id, quantity) VALUES (?, ?, ?)",
        [favoriteId, user_id, quantity]
      );

      console.log("Insert Result:", insertResult);

      // Update the status of the favorite item to 'cart'
      const updateResult = await db.query(
        "UPDATE favorite SET status = 'add cart' WHERE id = ?",
        [favoriteId]
      );

      console.log("Update Result:", updateResult);

      return {
        success: true,
        message: "Favorite item added to cart and status updated successfully",
      };
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async getAllCart() {
    const sql = "SELECT * FROM cart";
    try {
      const [cartItems] = await db.query(sql);
      return cartItems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCart(userId) {
    const sql = "SELECT * FROM cart WHERE user_id = ?";
    try {
      const [cartItems] = await db.query(sql, [userId]);
      return cartItems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
