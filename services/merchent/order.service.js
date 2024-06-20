module.exports = class orderMerchentServices {
  async placedOrder() {
    const sql = `SELECT * FROM orders WHERE status = "placed"`;
    console.log(sql);
    try {
      const [result] = await db.query(sql);
      const totalPlacesOrder = result.length;
      return { placesOrder: result, totalPlacesOrder: totalPlacesOrder };
    } catch {
      console.log(err);
      return err;
    }
  }

  async pendingOrder() {
    const sql = `SELECT * FROM orders WHERE status = "pending"`;
    console.log(sql);
    try {
      const [result] = await db.query(sql);
      const totalPendingOrder = result.length;
      return { pandingOrder: result, totalPendingOrder: totalPendingOrder };
    } catch {
      console.log(err);
      return err;
    }
  }

  async successOrder() {
    const sql = `SELECT * FROM orders WHERE status = "success"`;
    console.log(sql);
    try {
      const [result] = await db.query(sql);
      const totalSuccessOrder = result.length;
      return { successOrder: result, totalSuccessOrder: totalSuccessOrder };
    } catch {
      console.log(err);
      return err;
    }
  }

  async getAllOrder() {
    const sql = `SELECT * FROM orders `;
    console.log(sql);
    try {
      const [result] = await db.query(sql);
      const TotalAllOrder = result.length;
      return { orders: result, TotalAllOrder: TotalAllOrder };
    } catch {
      console.log(err);
      return err;
    }
  }
};
