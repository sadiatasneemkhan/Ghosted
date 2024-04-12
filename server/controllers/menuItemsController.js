import pool from "../db.js";

export async function getMenuItemByMenuItemId(id) {
  const [rows] = await pool.query(
    "SELECT menu_item_id, restaurant_id,name,description,price,is_available,category_id,image,prep_time FROM menu_items WHERE menu_item_id = ?",
    [id]
  );
  return rows;
}

export async function getMenuItemsByRestaurantId(id) {
  const [rows] = await pool.query(
    "SELECT menu_item_id, restaurant_id,name,description,price,is_available,category_id,image,prep_time FROM menu_items WHERE restaurant_id = ? AND is_available = 1",
    [id]
  );
  return rows;
}

export async function createMenuItem(
  restaurantId,
  name,
  description,
  price,
  isAvailable,
  categoryId,
  image,
  prepTime
) {
  try {
    const [result] = await pool.query(
      `INSERT INTO menu_items (restaurant_id, name, description, price, is_available, category_id, image, prep_time) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        restaurantId,
        name,
        description,
        price,
        isAvailable,
        categoryId,
        image,
        prepTime,
      ]
    );
    return { success: true, menuItemId: result.insertId };
  } catch (error) {
    console.error("Error creating menu item:", error);
    throw new Error("Error creating menu item");
  }
}

export async function deleteMenuItem(menuItemId, restaurantId) {
  try {
    // First, verify the item belongs to the given restaurant
    const [ownershipResult] = await pool.query(
      "SELECT * FROM menu_items WHERE menu_item_id = ? AND restaurant_id = ?",
      [menuItemId, restaurantId]
    );

    if (ownershipResult.length === 0) {
      throw new Error(
        "Menu item not found or does not belong to the specified restaurant"
      );
    }

    // Proceed with deletion after ownership is verified
    const [deleteResult] = await pool.query(
      "DELETE FROM menu_items WHERE menu_item_id = ? AND restaurant_id = ?",
      [menuItemId, restaurantId]
    );

    if (deleteResult.affectedRows === 0) {
      throw new Error("Error deleting menu item or item already deleted");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw new Error("Error deleting menu item");
  }
}

export async function updateMenuItem(
  menuItemId,
  name,
  description,
  price,
  isAvailable,
  categoryId,
  image,
  prepTime
) {
  try {
    const [result] = await pool.query(
      `UPDATE menu_items SET name = ?, description = ?, price = ?, is_available = ?, category_id = ?, image = ?, prep_time = ?
         WHERE menu_item_id = ?`,
      [
        name,
        description,
        price,
        isAvailable,
        categoryId,
        image,
        prepTime,
        menuItemId,
      ]
    );
    if (result.affectedRows === 0) {
      throw new Error("Menu item not found or data unchanged");
    }
    return { success: true };
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw new Error("Error updating menu item");
  }
}

export async function toggleMenuItemAvailability(menuItemId) {
  try {
    const [currentStatus] = await pool.query(
      "SELECT is_available FROM menu_items WHERE menu_item_id = ?",
      [menuItemId]
    );

    if (currentStatus.length === 0) {
      throw new Error("Menu item not found");
    }

    const newStatus = !currentStatus[0].is_available;
    const [result] = await pool.query(
      "UPDATE menu_items SET is_available = ? WHERE menu_item_id = ?",
      [newStatus, menuItemId]
    );
    return { success: true, newStatus };
  } catch (error) {
    console.error("Error toggling menu item availability:", error);
    throw new Error("Error toggling menu item availability");
  }
}
