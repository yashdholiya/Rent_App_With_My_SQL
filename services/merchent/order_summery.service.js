module.exports = class OrderSummaryService {
  async getOrderSummary(order_id) {
    try {
      // Check if the order status is 'success'
      const statusCheckSql = `SELECT status FROM orders WHERE order_id = ? AND status = 'success'`;
      const [statusResult] = await db.query(statusCheckSql, [order_id]);

      if (statusResult.length === 0) {
        throw new Error("Order status is not 'success'.");
      }

      const sql = `
        SELECT
          o.order_id,
          o.user_id,
          sa.id AS shipping_address_id,  
          o.deposite,
          o.subtotal,
          o.delevery_charge,
          o.total_price AS total_price_orders,
          oi.category_id,
          oi.quantity,
          oi.month_price,
          oi.week_price,
          p.id AS product_id,
          p.ref_categorie_id AS category_id
        FROM
          orders AS o
        JOIN
          order_items AS oi ON o.order_id = oi.order_id
        JOIN
          products AS p ON oi.product_id = p.id
        JOIN
          product_price AS pp ON p.id = pp.product_id
        JOIN
          users AS u ON o.user_id = u.id
        JOIN
          shipping_address AS sa ON u.id = sa.user_id
        WHERE
          o.order_id = ?                                              
      `;

      const [results] = await db.query(sql, [order_id]);
      if (!results || results.length === 0) {
        throw new Error("No results found for the order.");
      }

      const orderDetails = results[0];
      const totalProductPrice =
        orderDetails.quantity * orderDetails.month_price ||
        orderDetails.week_price;
      const deposit = orderDetails.deposite;
      const deliveryCharge = orderDetails.delevery_charge;
      const totalPayable = orderDetails.total_price_orders;

      // Insert the order summary into the order_summary table
      const insertSql = `
        INSERT INTO order_summary (order_id, user_id, product_id, pay_price, status)
        VALUES (?, ?, ?, ?, 'success')
      `;

      await db.query(insertSql, [
        orderDetails.order_id,
        orderDetails.user_id,
        orderDetails.product_id,
        totalPayable,
      ]);

      // Update order status to 'placed'
      const updateSql = `UPDATE orders SET status = 'placed' WHERE order_id = ?`;
      await db.query(updateSql, [order_id]);

      const orderSummary = {
        orderId: orderDetails.order_id,
        userId: orderDetails.user_id,
        productId: orderDetails.product_id,
        payPrice: totalPayable,
      };

      const paymentSummary = {
        deposit,
        deliveryCharge,
        totalPayable,
      };

      return {
        paymentSummary,
        orderSummary,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllOrderSummary() {
    try {
      const selectSql = `SELECT * FROM order_summary`;
      const [rows] = await db.query(selectSql);
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
