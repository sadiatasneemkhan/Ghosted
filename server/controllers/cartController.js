import pool from "../db.js";

export async function getCartDetailsById(cartId) {
  try {
    // Get basic cart info
    const [cart] = await pool.query(
      "SELECT cart_id, user_id, restaurant_id, created_at, updated_at FROM cart WHERE cart_id = ?",
      [cartId]
    );
    if (cart.length === 0) throw new Error("Cart not found");

    // Get items in the cart
    const [items] = await pool.query(
      `SELECT ci.cart_item_id, ci.item_id, ci.quantity, mi.name, mi.price 
      FROM cart_items ci 
      JOIN menu_items mi ON ci.item_id = mi.menu_item_id 
      WHERE ci.cart_id = ?`,
      [cartId]
    );

    return { cart: cart[0], items };
  } catch (error) {
    console.error("Error fetching cart details:", error);
    throw new Error("Error fetching cart details");
  }
}

export async function createCart(userId, restaurantId) {
  try {
    const [result] = await pool.query(
      "INSERT INTO cart (user_id, restaurant_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
      [userId, restaurantId]
    );
    return { success: true, cartId: result.insertId };
  } catch (error) {
    console.error("Error creating cart:", error);
    throw new Error("Error creating cart");
  }
}

export async function deleteCart(cartId) {
  try {
    await pool.query("BEGIN");
    await pool.query("DELETE FROM cart_items WHERE cart_id = ?", [cartId]);
    const [result] = await pool.query("DELETE FROM cart WHERE cart_id = ?", [
      cartId,
    ]);
    await pool.query("COMMIT");
    if (result.affectedRows === 0) {
      throw new Error("Cart not found or already deleted");
    }
    return { success: true };
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error deleting cart:", error);
    throw new Error("Error deleting cart");
  }
}

export async function getCartByUserRestId(userId, restId) {
  try {
    // Check if the cart already exists for the user and restaurant
    const [carts] = await pool.query(
      "SELECT cart_id FROM cart WHERE user_id = ? AND restaurant_id = ?",
      [userId, restId]
    );

    if (carts.length > 0) {
      // If a cart exists, return the first one found
      console.log("Cart found:", carts[0]);
      return carts[0];
    } else {
      // If no cart exists, create a new one
      const [result] = await pool.query(
        "INSERT INTO cart (user_id, restaurant_id) VALUES (?, ?)",
        [userId, restId]
      );

      // Return the new cart with the generated cart_id
      const newCartId = result.insertId;
      console.log("New cart created with ID:", newCartId);
      return { cart_id: newCartId };
    }
  } catch (error) {
    console.error("Error accessing or creating the cart:", error);
    throw error; // Rethrow error for handling upstream if needed
  }
}

export async function getCartsByUserId(userId) {
  try {
    const [carts] = await pool.query(
      "SELECT cart_id, user_id, restaurant_id, created_at, updated_at FROM cart WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    return carts;
  } catch (error) {
    console.error("Error fetching carts for user:", error);
    throw new Error("Error fetching carts for user");
  }
}
