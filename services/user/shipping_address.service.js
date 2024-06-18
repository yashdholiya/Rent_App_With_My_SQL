module.exports = class shippimngAddressServices {
  async createAddress(userId, address_1, address_2, city, pincode) {
    const sql =
      "INSERT INTO shipping_address (user_id, address_1, address_2, city, pincode) VALUES (?, ?, ?, ?,?) ";
    try {
      const [result] = await db.query(sql, [
        userId,
        address_1,
        address_2,
        city,
        pincode,
      ]);
      return {
        message: "Address created successfully",
        user_id: userId,
        address_1: address_1,
        address_2: address_2,
        city: city,
        pincode: pincode,
      };
    } catch (error) {
      console.log(error);
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
