import pool from "../db.js";

export async function getCartItemByCartItemId(id) {
  const [rows] = await pool.query(
    "SELECT cart_item_id, cart_id,item_id,quantity FROM cart_items WHERE cart_item_id = ?",
    [id]
  );
  return rows;
}

export async function getCartItemsByCartId(cartId) {
  try {
    const query = `
        SELECT 
          ci.cart_item_id, 
          ci.cart_id, 
          ci.item_id, 
          ci.quantity,
          mi.name, 
          mi.price, 
          mi.image
        FROM cart_items ci
        JOIN menu_items mi ON ci.item_id = mi.menu_item_id
        WHERE ci.cart_id = ?
      `;

    const [rows] = await pool.query(query, [cartId]);
    return rows;
  } catch (error) {
    console.error("Error fetching cart items with menu item details:", error);
    throw error; // Rethrow the error for further handling if necessary
  }
}

export async function addCartItem(cartId, itemId, quantity) {
  try {
    await pool.query("BEGIN");

    const [result] = await pool.query(
      "INSERT INTO cart_items (cart_id, item_id, quantity) VALUES (?, ?, ?)",
      [cartId, itemId, quantity]
    );

    await pool.query("UPDATE cart SET updated_at = NOW() WHERE cart_id = ?", [
      cartId,
    ]);

    await pool.query("COMMIT");
    return { success: true, cartItemId: result.insertId };
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error adding item to cart:", error);
    throw new Error("Error adding item to cart");
  }
}

export async function updateCartItemQuantity(cartItemId, cartId, newQuantity) {
  try {
    await pool.query("BEGIN");

    const [result] = await pool.query(
      "UPDATE cart_items SET quantity = ? WHERE cart_item_id = ? AND cart_id = ?",
      [newQuantity, cartItemId, cartId]
    );
    if (result.affectedRows === 0) {
      throw new Error(
        "Cart item not found, does not belong to this cart, or quantity unchanged"
      );
    }

    await pool.query("UPDATE cart SET updated_at = NOW() WHERE cart_id = ?", [
      cartId,
    ]);

    await pool.query("COMMIT");
    return { success: true };
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error updating cart item quantity:", error);
    throw new Error("Error updating cart item quantity");
  }
}

export async function removeCartItem(cartItemId, cartId) {
  try {
    await pool.query("BEGIN");

    const [result] = await pool.query(
      "DELETE FROM cart_items WHERE cart_item_id = ? AND cart_id = ?",
      [cartItemId, cartId]
    );
    if (result.affectedRows === 0) {
      throw new Error(
        "Cart item not found, already removed, or does not belong to this cart"
      );
    }

    await pool.query("UPDATE cart SET updated_at = NOW() WHERE cart_id = ?", [
      cartId,
    ]);

    await pool.query("COMMIT");
    return { success: true };
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error removing item from cart:", error);
    throw new Error("Error removing item from cart");
  }
}
