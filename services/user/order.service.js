module.exports = class orderServices {
  async createOrder(userId, discount, delivery_charge, priceType) {
    try {
      const cartItemsSql = `
        SELECT
          p.id AS product_id,
          p.ref_categorie_id AS category_id,
          c.quantity,
          pp.month_price,
          pp.week_price,
          pp.deposite
        FROM
          cart AS c
        JOIN
          users AS u ON c.user_id = u.id
        JOIN
          favorite AS f ON c.favorite_id = f.id
        JOIN
          products AS p ON f.product_id = p.id
        JOIN
          product_price AS pp ON p.id = pp.product_id
        WHERE
          u.id = ?;
      `;
      console.log("Query executed: ", cartItemsSql);

      const [cartItems] = await db.query(cartItemsSql, [userId]);
      console.log("Cart items: ", cartItems);
      if (cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      let subtotal = 0;
      let totalDeposit = 0;
      const orderItems = cartItems.map((item) => {
        const price =
          priceType === "month" ? item.month_price : item.week_price;
        const total_price = item.quantity * price;
        subtotal += total_price;
        totalDeposit += (item.deposite || 0) * item.quantity; 
        return {
          category_id: item.category_id,
          product_id: item.product_id,
          month_price: priceType === "month" ? price : 0,
          week_price: priceType === "week" ? price : 0,
          quantity: item.quantity,
          total_price: total_price,
          deposite: item.deposite || 0,
        };
      });

      const total_price = subtotal + delivery_charge + totalDeposit - discount;
      console.log(
        "Calculated total_price:",
        total_price,
        "Calculated totalDeposit:",
        totalDeposit
      );

      const orderSql =
        "INSERT INTO orders (user_id, subtotal, delevery_charge, discount, total_price, deposite) VALUES (?, ?, ?, ?, ?, ?)";
      const [orderResult] = await db.query(orderSql, [
        userId,
        subtotal,
        delivery_charge,
        discount,
        total_price,
        totalDeposit,
      ]);
      const orderId = orderResult.insertId;

      // Insert order items into order_items table
      const orderItemsSql =
        "INSERT INTO order_items (order_id, category_id, product_id, month_price, week_price, quantity, total_price) VALUES ?";
      await db.query(orderItemsSql, [
        orderItems.map((item) => [
          orderId,
          item.category_id,
          item.product_id,
          item.month_price,
          item.week_price,
          item.quantity,
          item.total_price,
          // item.deposite,
        ]),
      ]);

      // Clear cart
      const clearCartSql = "DELETE FROM cart WHERE user_id = ?";
      await db.query(clearCartSql, [userId]);

      return {
        orderId,
        userId,
        subtotal,
        delivery_charge,
        discount,
        total_price,
        totalDeposit,
        orderItems,
      };
    } catch (err) {
      console.error("Error creating order:", err);
      throw err;
    }
  }
};
