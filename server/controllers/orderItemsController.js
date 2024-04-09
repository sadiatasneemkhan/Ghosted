import pool from "../db.js";

export async function getOrderItemByOrderItemId(id) {
    const [rows] = await pool.query(
      'SELECT order_item_id,order_id,item_id,quantity  FROM order_items WHERE order_item_id = ?'
      ,[id]);
    return rows;
  }

  export async function getOrderItemsByOrder(id) {
    const [rows] = await pool.query(
        'SELECT order_item_id,order_id,item_id,quantity  FROM order_items WHERE order_id = ?'
        ,[id]);
    return rows;
  }

  export async function updateOrderItemQuantity(orderItemId, newQuantity) {
    try {
      const [result] = await pool.query(
        'UPDATE order_items SET quantity = ? WHERE order_item_id = ?',
        [newQuantity, orderItemId]
      );
      return result;
    } catch (error) {
      console.error('Error updating order item quantity:', error);
      throw error;
    }
  }

  export async function getOrderItemDetailsByOrder(orderId) {
    try {
      const [rows] = await pool.query(
        `SELECT oi.order_item_id, oi.order_id, oi.item_id, oi.quantity, 
        mi.name, mi.description, mi.price 
        FROM order_items oi 
        JOIN menu_items mi ON oi.item_id = mi.menu_item_id 
        WHERE oi.order_id = ?`,
        [orderId]
      );
      return rows;
    } catch (error) {
      console.error('Error fetching detailed order items:', error);
      throw error;
    }
  }

  export async function removeItemFromOrder(orderItemId, orderId) {
    try {
      const [result] = await pool.query(
        'DELETE FROM order_items WHERE order_item_id = ? AND order_id = ?',
        [orderItemId, orderId]
      );
      return result;
    } catch (error) {
      console.error('Error removing item from order:', error);
      throw error;
    }
  }
  
  export async function addItemToOrder(orderId, itemId, quantity) {
    try {
      const [result] = await pool.query(
        'INSERT INTO order_items (order_id, item_id, quantity) VALUES (?, ?, ?)',
        [orderId, itemId, quantity]
      );
      return result;
    } catch (error) {
      console.error('Error adding item to order:', error);
      throw error;
    }
  }