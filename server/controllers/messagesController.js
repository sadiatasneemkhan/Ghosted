import pool from "../db.js";

export async function getAllMessagesByUserId(user_id) {
  const [messages] = await pool.query(
    `SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY sent_at DESC`,
    [user_id, user_id]
  );
  return messages;
}

export async function getBusinessByUserId(user_id) {
  const [business_name] = await pool.query(
    `SELECT business_name, logo FROM restaurants WHERE user_id = ?`,
    [user_id]
  );
  return business_name[0];
}

export async function getCustomerByUserId(user_id) {
  const [customer_name] = await pool.query(
    `SELECT first_name, profile_pic FROM customers WHERE user_id = ?`,
    [user_id]
  );
  return customer_name[0];
}

export async function getAllRestaurantsByUserId(user_id) {
  const [recievers] = await pool.query(
    `SELECT R.business_name, R.user_id, M.sent_at, R.logo FROM restaurants AS R JOIN messages AS M ON R.user_id = M.sender_id OR R.user_id = M.receiver_id WHERE M.sender_id = ? OR M.receiver_id = ? GROUP BY R.user_id`,
    [user_id, user_id]
  );
  return recievers;
}

export async function getAllCustomersByUserId(user_id) {
  const [recievers] = await pool.query(
    `SELECT C.first_name, C.last_name, C.user_id, M.sent_at, C.profile_pic FROM customers AS C JOIN messages AS M ON C.user_id = M.sender_id OR C.user_id = M.receiver_id WHERE M.sender_id = ? OR M.receiver_id = ? GROUP BY C.user_id`,
    [user_id, user_id]
  );
  return recievers;
}

export async function getConversationByUserId(sender_id, receiver_id) {
  const [messages] = await pool.query(
    `SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY sent_at DESC`,
    [sender_id, receiver_id, receiver_id, sender_id]
  );
  return messages;
}

export async function createMessage(sender_id, receiver_id, content) {
  const [result] = await pool.query(
    `INSERT INTO messages (sender_id, receiver_id, content, message_status) VALUES (?, ?, ?, 'sent')`,
    [sender_id, receiver_id, content]
  );
  if (result.affectedRows) {
    return { sender_id, receiver_id, content, message_status: "sent" };
  }
  throw new Error("Message creation failed");
}
