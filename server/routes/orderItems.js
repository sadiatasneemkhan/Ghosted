import express from 'express';
import {
  getOrderItemByOrderItemId,
  getOrderItemsByOrder,
  updateOrderItemQuantity,
  getOrderItemDetailsByOrder,
  removeItemFromOrder,
  addItemToOrder,
} from '../controllers/orderItemsController.js'; 

const router = express.Router();

// Fetch a single order item by its ID
router.get('/:order_item_id', async (req, res) => {
  try {
    const order_item_id = req.params.order_item_id;
    const item = await getOrderItemByOrderItemId(order_item_id);
    if (item.length === 0) {
      return res.status(404).send('Order item not found');
    }
    res.json(item);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Fetch all items for a specific order
router.get('/order/:order_id', async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const items = await getOrderItemsByOrder(order_id);
    res.json(items);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update the quantity of a specific order item
router.put('/:order_item_id', async (req, res) => {
  try {
    const { newQuantity } = req.body;
    //validate
    if (!Number.isInteger(newQuantity) || newQuantity < 1) {
        return res.status(400).send('Invalid quantity');
      }
    const order_item_id = req.params.order_item_id;
    await updateOrderItemQuantity(order_item_id, newQuantity);
    res.json({ success: true });
  } catch (error) {
    res.status(500).send('Error updating order item quantity');
  }
});

// Fetch detailed information for all items in an order
router.get('/details/:order_id', async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const items = await getOrderItemDetailsByOrder(order_id);
    res.json(items);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add an item to an order
router.post('/', async (req, res) => {
  try {
    const { orderId, itemId, quantity } = req.body;
    const result = await addItemToOrder(orderId, itemId, quantity);
    res.status(201).json({ success: true, orderItemId: result.insertId });
  } catch (error) {
    res.status(500).send('Error adding item to order');
  }
});

// Remove an item from an order
router.delete('/:order_item_id', async (req, res) => {
  try {
    const order_item_id = req.params.order_item_id;
    const { orderId } = req.body; 
    if (!orderId) {
        return res.status(400).send('Order ID is required');
      }
    await removeItemFromOrder(order_item_id, orderId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).send('Error removing item from order');
  }
});

export default router;
