const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "yash";

module.exports = class UserServices {
  async registerUser(userdata) {
    try {
      const hashedPassword = await bcrypt.hash(userdata.password, 10);

      const sql =
        "INSERT INTO users (id, name, profileImage, email, password, mobileno) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [
        userdata.id,
        userdata.name,
        userdata.profileImage,
        userdata.email,
        hashedPassword,
        userdata.mobileno,
      ];

      const [result] = await global.db.query(sql, values);
      console.log("User registered successfully:", result.insertId);
      return result.insertId;
    } catch (error) {
      console.error("Error while registering user:", error.message);
      throw error; // Rethrow the error to handle it in the caller
    }
  }

  // LOGIN USER
  async getUserByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    try {
      const [result] = await db.query(sql, [email]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error("Error in getUserByEmail:", error);
      throw error;
    }
  }

  // UPDATE USER
  async updateUser(userId, userData) {
    const fields = [];
    const values = [];

    if (userData.name) {
      fields.push("name = ?");
      values.push(userData.name);
    }

    if (userData.profileImage) {
      fields.push("profileImage = ?");
      values.push(userData.profileImage);
    }

    if (userData.mobileno) {
      const mobileno = parseInt(userData.mobileno);
      if (isNaN(mobileno)) {
        console.log("Mobile number:", mobileno);
        throw new Error("Mobile number must be an integer");
      }
      fields.push("mobileno = ?");
      console.log("Mobile number:", mobileno);
      values.push(mobileno);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(userId);
    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

    try {
      await db.query(sql, values);
      return { success: true, message: "User updated successfully" };
    } catch (error) {
      throw new Error("Failed to update user: " + error.message);
    }
  }

  // UPDATE PASSWORD
  async updatePassword(userId, oldPassword, newPassword, confirmPassword) {
    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirmation password do not match");
    }

    const sql = "SELECT * FROM users WHERE id = ?";
    try {
      const [rows] = await db.query(sql, [userId]);
      if (rows.length === 0) {
        throw new Error("User not found");
      }

      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new Error("Old password is incorrect");
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const updateSql = "UPDATE users SET password = ? WHERE id = ?";
      await db.query(updateSql, [hashedNewPassword, userId]);

      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      throw new Error("Failed to update password: " + error.message);
    }
  }

  //GET USER BY TOKEN
  async getUserById(userId) {
    const sql = "SELECT * FROM users WHERE id = ?";
    try {
      const [rows] = await db.query(sql, [userId]);
      if (rows.length === 0) {
        throw new Error("User not found");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Failed to get user: " + error.message);
    }
  }

  // SERCH PROUCT
  async searchAndFilterProducts(category, search) {
    let sql = `
        SELECT products.id, products.name, products.productImage, products.description, products.created_at, categories.name as category_name
        FROM products
        LEFT JOIN categories ON products.ref_categorie_id = categories.id
        WHERE 1=1
    `;
    let params = [];

    if (category) {
      sql += " AND categories.name = ?";
      params.push(category);
    }

    if (search) {
      sql += " AND products.name LIKE ?";
      params.push("%" + search + "%");
    }
    console.log("params...", params);
    try {
      const [rows] = await db.query(sql, params);
      console.log("serch  result .........", rows);
      return rows;
    } catch (error) {
      throw new Error("Failed to search products: " + error.message);
    }
  }

  async getProductsByPriceRange(rentType, minPrice, maxPrice) {
    let priceColumn;

    switch (rentType) {
      case "month":
        priceColumn = "pp.month_price";
        break;
      case "week":
        priceColumn = "pp.week_price";
        break;
      default:
        throw new Error("Invalid price type");
    }

    const sql = `
      SELECT
          p.id AS product_id,
          p.name AS product_name,
          p.description,
          pp.month_price,
          pp.week_price,
          c.name AS category_name
      FROM
          products AS p
      JOIN
          product_price AS pp ON p.id = pp.product_id
      JOIN
          categories AS c ON p.ref_categorie_id = c.id
      WHERE
          ${priceColumn} BETWEEN ? AND ?
          ORDER BY
        ${priceColumn} ASC
    `;

    try {
      const [results] = await db.query(sql, [minPrice, maxPrice]);
      return results;
    } catch (error) {
      console.error("Error fetching products by price range:", error);
      throw error;
    }
  }

  // trending product

  async getTrendingProducts() {
    const sql = `
      SELECT
          p.id AS product_id,
          p.name AS product_name,
          p.description,
          pp.month_price,
          pp.week_price,
          c.name AS category_name
      FROM
          products AS p
      JOIN
          product_price AS pp ON p.id = pp.product_id
      JOIN
          categories AS c ON p.ref_categorie_id = c.id
      ORDER BY
          p.created_at DESC
      LIMIT 10
    `;

    try {
      const [results] = await db.query(sql);
      return results;
    } catch (error) {
      console.error("Error fetching trending products:", error);
      throw error;
    }
  }
};
