import express from "express";
import {
  createCart,
  deleteCart,
  getCartDetailsById,
  getCartsByUserId,
  getCartByUserRestId,
} from "../controllers/cartController.js";

const router = express.Router();

// Create a new cart
router.post("/", async (req, res) => {
  try {
    const { userId, restaurantId } = req.body;
    const result = await createCart(userId, restaurantId);
    res.status(201).json({ success: true, cartId: result.cartId });
  } catch (error) {
    res.status(500).send("Error creating cart");
  }
});

// Delete a cart by ID
router.delete("/:cart_id", async (req, res) => {
  try {
    const cart_id = req.params.cart_id;
    const result = await deleteCart(cart_id);
    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(404).send("Cart not found or already deleted");
    }
  } catch (error) {
    res.status(500).send("Error deleting cart");
  }
});

// Get cart details by cart ID
router.get("/:cart_id", async (req, res) => {
  try {
    const cart_id = req.params.cart_id;
    const details = await getCartDetailsById(cart_id);
    res.json(details);
  } catch (error) {
    res.status(500).send("Error fetching cart details");
  }
});

// Get all carts for a user by user ID
router.get("/user/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const carts = await getCartsByUserId(user_id);
    if (carts.length === 0) {
      return res.status(404).send("No carts found for this user");
    }
    res.json(carts);
  } catch (error) {
    res.status(500).send("Error fetching carts for user");
  }
});

//get specific cart
// Get all carts for a user by user ID
router.get("/cartid/:user_id/:rest_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const restaurant_id = req.params.rest_id;
    const carts = await getCartByUserRestId(user_id, restaurant_id);
    if (carts.length === 0) {
      return res.status(404).send("No carts found for this user");
    }
    res.json(carts);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
