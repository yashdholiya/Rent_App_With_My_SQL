module.exports = class paymentServices {
  async createPayment(orderId, amount, paymentMethod, transactionId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const orderSql =
        "SELECT total_price, status FROM orders WHERE order_id = ?";
      const [orderResults] = await connection.query(orderSql, [orderId]);

      if (orderResults.length === 0) {
        throw new Error("Order not found");
      }

      const order = orderResults[0];
      const orderTotalPrice = parseFloat(order.total_price).toFixed(2);               
      const paymentAmount = parseFloat(amount).toFixed(2);

      console.log("orderTotalPrice:", orderTotalPrice);
      console.log("paymentAmount:", paymentAmount);

      if (orderTotalPrice !== paymentAmount) {
        throw new Error("Payment amount does not match the order total price");
      }

      const paymentSql = `
                INSERT INTO payments (order_id, amount, payment_method, transaction_id, status) 
                VALUES (?, ?, ?, ?, ?)
            `;
              const paymentValues = [orderId, amount, paymentMethod, transactionId, "success"];
      const [paymentResult] = await connection.query(paymentSql, [
        orderId,
        amount,
        paymentMethod,
        transactionId,
        "success", // Assuming payment is successful for this logic
      ]);

      const updateOrderSql = "UPDATE orders SET status = ? WHERE order_id = ?";
      await connection.query(updateOrderSql, ["success", orderId]);

      // Find related product_id and quantity from order_items table
      const orderItemsSql =
        "SELECT product_id, quantity FROM order_items WHERE order_id = ?";
      const [orderItems] = await connection.query(orderItemsSql, [orderId]);

      for (const item of orderItems) {
      }

      await connection.commit();

      return {
        status: 201,
        message: "Payment created and order status updated successfully",
        data: {
          payment_id: paymentResult.insertId,
          order_id: orderId,
          amount,
          payment_method: paymentMethod,
          transaction_id: transactionId, // Return transaction ID
          status: "success",
        },
      };
    } catch (err) {
      await connection.rollback();
      console.error("Error creating payment:", err);
      return {
        status: 500,
        error: err.message || "Internal Server Error",
      };
    } finally {
      connection.release();
    }
  }

  // GET ALL PAYMENT
  async getAllPayment() {
    const sql = "SELECT * FROM payments";
    try {
      const [result] = await db.query(sql);
      console.log("All payment :", result);
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // GET  SPECIFIC PAYMENT
  async getSpecificPayment(id) {
    const sql = "SELECT * FROM payments WHERE payment_id = ?";
    try {
      const [result] = await db.query(sql, [id]);
      console.log("Specific payment:", result);
      return result;
    } catch (error) {
      console.error("Error fetching payment:", error);
      throw error;
    }
  }
};
