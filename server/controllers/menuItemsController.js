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

export async function updateMenuItem(menuItemId, fields) {
  const { name, description, price, isAvailable, categoryId, image, prepTime } =
    fields;

  // Collect fields to update
  const updates = [];
  const values = [];

  if (name !== undefined && name !== "") {
    updates.push("name = ?");
    values.push(name);
  }
  if (description !== undefined && description !== "") {
    updates.push("description = ?");
    values.push(description);
  }
  if (price !== undefined && price !== "") {
    updates.push("price = ?");
    values.push(price);
  }
  if (isAvailable !== undefined && isAvailable !== "") {
    updates.push("is_available = ?");
    values.push(isAvailable);
  }
  if (categoryId !== undefined && categoryId !== "") {
    updates.push("category_id = ?");
    values.push(categoryId);
  }
  if (image !== undefined && image !== "") {
    updates.push("image = ?");
    values.push(image);
  }
  if (prepTime !== undefined && prepTime !== "") {
    updates.push("prep_time = ?");
    values.push(prepTime);
  }

  // Make sure there are updates to be made
  if (updates.length === 0) {
    return { success: false, message: "No updates provided" };
  }

  // Build SQL query dynamically
  const query = `UPDATE menu_items SET ${updates.join(
    ", "
  )} WHERE menu_item_id = ?`;
  values.push(menuItemId);

  try {
    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Menu item not found or data unchanged",
      };
    }
    return { success: true, message: "Menu item updated successfully" };
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

// image upload

export async function updateMenuItemImgByRestaurantId(img, restaurant_id) {
  try {
    await pool.query(
      `UPDATE menu_items SET image = ? WHERE restaurant_id = ?`,
      [img, restaurant_id]
    );
  } catch (error) {
    console.error(`Error updating menu_item image`, error);
    throw error;
  }
}

export async function getMenuItemImgByRestaurantId(restaurant_id) {
  try {
    await pool.query(`SELECT image FROM menu_items WHERE restaurant_id = ?`, [
      restaurant_id,
    ]);
  } catch (error) {
    console.error(`Error getting menu item pic`, error);
    throw error;
  }
}
