import express from "express";
import {
  getOrderByOrderId,
  getOrdersByCustomerId,
  getOrdersByRestaurantId,
  getOrderStatusbyOrderId,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/ordersConroller.js";

const router = express.Router();

// Fetch order by order ID
router.get("/:order_id", async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const order = await getOrderByOrderId(order_id);
    if (order.length === 0) {
      return res.status(404).send("Order not found");
    }
    res.json(order);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Fetch orders by customer ID
router.get("/customer/:customer_id", async (req, res) => {
  try {
    const customer_id = req.params.customer_id;
    const orders = await getOrdersByCustomerId(customer_id);
    res.json(orders);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Fetch orders by restaurant ID
router.get("/restaurant/:restaurant_id", async (req, res) => {
  try {
    const restaurant_id = req.params.restaurant_id;
    const orders = await getOrdersByRestaurantId(restaurant_id);
    res.json(orders);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Fetch order status by order ID
router.get("/status/:order_id", async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const status = await getOrderStatusbyOrderId(order_id);
    res.json(status);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { customerId, restaurantId, total, dueAt, statusId } = req.body;
    const result = await createOrder(customerId, restaurantId, total, dueAt, statusId);
    res.status(201).json({ success: true, orderId: result.insertId });
  } catch (error) {
    res.status(500).send("Error creating order");
  }
});

// Update order status
router.put("/status/:order_id", async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const { statusId } = req.body;
    await updateOrderStatus(order_id, statusId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).send("Error updating order status");
  }
});

// Delete an order
router.delete("/:order_id", async (req, res) => {
  try {
    const order_id = req.params.order_id;
    await deleteOrder(order_id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).send("Error deleting order");
  }
});

export default router;
