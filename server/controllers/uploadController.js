import pool from "../db.js";

export async function postImageTest(url) {
  const [result] = await pool.query(
    `UPDATE restaurants SET logo = ? WHERE restaurant_id = 1`,
    [url]
  );
  console.log(result);
  return result[0];
}

export async function getImageTest() {
  const [result] = await pool.query(
    `SELECT logo FROM restaurants WHERE restaurant_id = 1`
  );
  console.log(result);
  return result[0];
}
