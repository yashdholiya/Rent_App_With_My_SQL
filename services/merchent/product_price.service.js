module.exports = class productPriceServices {
  async addPrice(productid, week_price, month_price, deposite) {
    try {
      const sql =
        "INSERT INTO product_price (product_id, week_price, month_price,deposite) VALUES (?, ?, ? ,?)";
      const result = await db.query(sql, [
        productid,
        week_price,
        month_price,
        deposite,
      ]);
      return {
        product_id: productid,
        week_price: week_price,
        month_price: month_price,
        deposite: deposite,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllProductPrice() {
    try {
      const sql = "SELECT * FROM product_price";
      const [result] = await db.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async UpdateProductPrice(product_id, week_price, month_price, deposite) {
    let sql = "UPDATE product_price SET";
    const params = [];

    if (week_price !== undefined) {
      sql += " week_price = ?,";
      params.push(week_price);
    }
    if (month_price !== undefined) {
      sql += " month_price = ?,";
      params.push(month_price);
    }
    if (deposite !== undefined) {
      sql += " deposite = ?,";
      params.push(deposite);
    }

    sql = sql.slice(0, -1);
    sql += " WHERE product_id = ?";
    params.push(product_id);

    try {
      const [result] = await db.query(sql, params);
      return {
        message: "Product price updated successfully",
      };
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
};
