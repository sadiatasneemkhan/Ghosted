import express from "express";
import {
  getMenuItemByMenuItemId,
  getMenuItemsByRestaurantId,
  createMenuItem,
  deleteMenuItem,
  updateMenuItem,
  toggleMenuItemAvailability,
} from "../controllers/menuItemsController.js";

const router = express.Router();

// Fetch a single menu item by its ID
router.get("/:menu_item_id", async (req, res) => {
  try {
    const menu_item_id = req.params.menu_item_id;
    const item = await getMenuItemByMenuItemId(menu_item_id);
    if (item.length === 0) {
      return res.status(404).send("Menu item not found");
    }
    res.json(item[0]);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Fetch all menu items for a specific restaurant
router.get("/restaurant/:restaurant_id", async (req, res) => {
  try {
    const restaurant_id = req.params.restaurant_id;
    const items = await getMenuItemsByRestaurantId(restaurant_id);
    res.json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new menu item
router.post("/", async (req, res) => {
  try {
    const {
      restaurantId,
      name,
      description,
      price,
      isAvailable,
      categoryId,
      image,
      prepTime,
    } = req.body;
    const result = await createMenuItem(
      restaurantId,
      name,
      description,
      price,
      isAvailable,
      categoryId,
      image,
      prepTime
    );
    res.status(201).json({ success: true, menuItemId: result.menuItemId });
  } catch (error) {
    res.status(500).send("Error creating menu item");
  }
});

// Update a menu item
router.put("/:menu_item_id", async (req, res) => {
  try {
    const menu_item_id = req.params.menu_item_id;
    const {
      name,
      description,
      price,
      isAvailable,
      categoryId,
      image,
      prepTime,
    } = req.body;
    const result = await updateMenuItem(
      menu_item_id,
      name,
      description,
      price,
      isAvailable,
      categoryId,
      image,
      prepTime
    );
    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(404).send("Menu item not found or data unchanged");
    }
  } catch (error) {
    res.status(500).send("Error updating menu item");
  }
});

// Delete a menu item
router.delete("/:menu_item_id/:restaurant_id", async (req, res) => {
  try {
    const { menu_item_id, restaurant_id } = req.params;
    const result = await deleteMenuItem(menu_item_id, restaurant_id);
    if (result.success) {
      res.json({ success: true });
    } else {
      res
        .status(404)
        .send(
          "Menu item not found or does not belong to the specified restaurant"
        );
    }
  } catch (error) {
    res.status(500).send("Error deleting menu item");
  }
});

// Toggle the availability of a menu item
router.patch("/toggle-availability/:menu_item_id", async (req, res) => {
  try {
    const menu_item_id = req.params.menu_item_id;
    const result = await toggleMenuItemAvailability(menu_item_id);
    if (result.success) {
      res.json({ success: true, newStatus: result.newStatus });
    } else {
      res.status(404).send("Menu item not found");
    }
  } catch (error) {
    res.status(500).send("Error toggling menu item availability");
  }
});

export default router;
