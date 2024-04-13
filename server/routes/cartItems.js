import express from "express";
import {
  getCartItemByCartItemId,
  getCartItemsByCartId,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
} from "../controllers/cartItemsController.js";

const router = express.Router();

// Fetch a single cart item by its ID
router.get("/:cart_item_id", async (req, res) => {
  try {
    const cart_item_id = req.params.cart_item_id;
    const item = await getCartItemByCartItemId(cart_item_id);
    if (item.length === 0) {
      return res.status(404).send("Cart item not found");
    }
    res.json(item[0]);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Fetch all items for a specific cart
router.get("/cart/:cart_id", async (req, res) => {
  try {
    const cart_id = req.params.cart_id;
    const items = await getCartItemsByCartId(cart_id);
    res.json(items);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Add an item to a cart
router.post("/", async (req, res) => {
  try {
    const { cartId, itemId, quantity } = req.body;
    const result = await addCartItem(cartId, itemId, quantity);
    res.status(201).json({ success: true, cartItemId: result.cartItemId });
  } catch (error) {
    res.status(500).send("Error adding item to cart");
  }
});

// Update the quantity of a specific cart item
router.put("/", async (req, res) => {
  try {
    const { cartItemId, cartId, newQuantity } = req.body;
    const result = await updateCartItemQuantity(
      cartItemId,
      cartId,
      newQuantity
    );
    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(404).send("Cart item not found or quantity unchanged");
    }
  } catch (error) {
    res.status(500).send("Error updating cart item quantity");
  }
});

// Remove an item from a cart
router.delete("/", async (req, res) => {
  try {
    const cartId = req.body.cartId;
    const cartItemId = req.body.cartItemId;
    console.log(cartId);
    console.log(cartItemId);
    const result = await removeCartItem(cartItemId, cartId);
    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(404).send("Cart item not found or already removed");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
