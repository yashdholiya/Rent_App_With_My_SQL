module.exports = class orderMerchentServices {
  async placedOrder() {
    const sql = `SELECT * FROM orders WHERE status = "placed"`;
    console.log(sql);
    try {
      const [result] = await db.query(sql);
      return result;
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
      return result;
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
      return result;
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
      return result;
    } catch {
      console.log(err);
      return err;
    }
  }
};
