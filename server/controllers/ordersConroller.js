import pool from "../db.js";

export async function getOrderByOrderId(id) {
    const [rows] = await pool.query(
      'SELECT order_id,customer_id,restaurant_id,total,created_at,due_at,status_id  FROM orders WHERE order_id = ?',
      [id]
    );
    return rows;
  }

  export async function getOrdersByCustomerId(id) {
    const [rows] = await pool.query(
        'SELECT order_id,customer_id,restaurant_id,total,created_at,due_at,status_id  FROM orders WHERE customer_id = ?',
        [id]
        );
    return rows;
  }

  export async function getOrdersByRestaurantId(id) {
    const [rows] = await pool.query(
        'SELECT order_id,customer_id,restaurant_id,total,created_at,due_at,status_id  FROM orders WHERE restaurant_id = ?',
        [id]
        );
    return rows;
  }

  export async function getOrderStatusbyOrderId(id) {
    const [rows] = await pool.query(
        'SELECT order_statuses.order_status FROM orders INNER JOIN order_statuses ON orders.status_id = order_statuses.order_status_id WHERE orders.order_id = ?',
        [id]
        );
    return rows;
  }

  export async function createOrder(customerId, restaurantId, total, dueAt, statusId = 1) {
    try {
      const [result] = await pool.query(
        'INSERT INTO orders (customer_id, restaurant_id, total, due_at, status_id) VALUES (?, ?, ?, ?, ?)',
        [customerId, restaurantId, total, dueAt, statusId]
      );
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  export async function updateOrderStatus(orderId, statusId) {
    try {
      const [result] = await pool.query(
        'UPDATE orders SET status_id = ? WHERE order_id = ?',
        [statusId, orderId]
      );
      return result;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  export async function deleteOrder(orderId) {
    try {
      const [result] = await pool.query(
        'DELETE FROM orders WHERE order_id = ?',
        [orderId]
      );
      return result;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }



