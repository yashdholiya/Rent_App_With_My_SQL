module.exports = class ShippingAddressService {
  async createAddress(order_id, address_1, address_2, city, pincode) {
    try {
      // Check if the order status is 'success'
      const statusCheckSql = `SELECT user_id, status FROM orders WHERE order_id = ?`;
      const [statusResult] = await db.query(statusCheckSql, [order_id]);

      if (statusResult.length === 0) {
        throw new Error("Order not found.");
      }

      const { user_id: userId, status } = statusResult[0];

      if (status !== "success") {
        throw new Error("Order status is not 'success'.");
      }

      // Insert the new address into the shipping_address table
      const insertSql = `
        INSERT INTO shipping_address (order_id, user_id, address_1, address_2, city, pincode)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const [result] = await db.query(insertSql, [
        order_id,
        userId,
        address_1,
        address_2,
        city,
        pincode,
      ]);

      const updateOrderStatus = "UPDATE orders SET status = 'shipped' WHERE order_id = ?";
      await db.query(updateOrderStatus, [order_id]);


      return {
        message: "Address created successfully",
        order_id,
        user_id: userId,
        address_1,
        address_2,
        city,
        pincode,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllAddress() {
    const sql = "SELECT * FROM shipping_address";
    try {
      const [result] = await db.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateAddress(user_id, addressId, address_1, address_2, city, pincode) {
    let sql = "UPDATE shipping_address SET";
    const params = [];

    if (addressId !== undefined) {
      sql += " addressId = ?,";
      params.push(addressId);
    }
    if (address_1 !== undefined) {
      sql += " address_1 = ?,";
      params.push(address_1);
    }
    if (address_2 !== undefined) {
      sql += " address_2 = ?,";
      params.push(address_2);
    }
    if (city !== undefined) {
      sql += " city = ?,";
      params.push(city);
    }
    if (pincode !== undefined) {
      sql += " pincode = ?,";
      params.push(pincode);
    }

    sql = sql.slice(0, -1);
    sql += " WHERE user_id = ?";
    params.push(user_id);

    try {
      const [result] = await db.query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async deleteAddress(id) {
    const sql = "DELETE FROM shipping_address WHERE id = ?";
    const params = [id];
    try {
      const [result] = await db.query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
};
