import pool from "../db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

//only for unhashing password - not needed on frontend
async function getUserPassword(email) {
  const [result] = await pool.query(
    `SELECT password FROM users WHERE email = ?`,
    [email]
  );
  console.log(result);
  return result[0];
}

//Prepared statement
export async function getUser(email, password) {
  const user = await getUserPassword(email);
  console.log(user);
  if (user) {
    console.log("user exists");
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log("match found");
      const [rows] = await pool.query(
        `SELECT U.user_id, UT.user_type, U.phone FROM users AS U JOIN user_types AS UT ON U.user_type_id = UT.user_type_id WHERE U.email = ?`,
        [email]
      );
      console.log(rows);
      return rows;
    } else {
      return { message: "Incorrect Password" };
    }
  }
  return { message: "User Not Found" };
}

export async function getUserById(user_id) {
  const [rows] = await pool.query(
    `SELECT user_type, phone FROM users as U JOIN user_types as UT ON U.user_type_id = UT.user_type_id WHERE user_id = ?`,
    [user_id]
  );
  return rows;
}

/* eliminated need for functions


export async function updatePasswordByUserId(user_id, password) {
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);

    await pool.query(`UPDATE users SET password = ? WHERE user_id = ?`, [
      hashPassword,
      user_id,
    ]);
    //no return
  } catch (error) {
    console.error(`Error updating password`, error);
    throw error;
  }
}

export async function updatePhoneByUserId(phone, user_id) {
  try {
    await pool.query(`UPDATE users SET phone = ? WHERE user_id = ?`, [
      phone,
      user_id,
    ]);
    return getUserById(user_id);
  } catch (error) {
    console.error(`Error updating customer phone number`, error);
    throw error;
  }
}

export async function updateEmailByUserId(email, user_id) {
  try {
    await pool.query(`UPDATE users SET email = ? WHERE user_id = ?`, [
      email,
      user_id,
    ]);
    return getUserById(user_id);
  } catch (error) {
    console.error(`Error updating customer email`, error);
    throw error;
  }
}
*/

export async function createUser(user_type, phone, email, password) {
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.query(
      `INSERT INTO users (user_type_id, phone, email, password) VALUES (?, ?, ?, ?)`,
      [user_type, phone, email, hashPassword]
    );

    const id = result.insertId;
    return id;
  } catch (error) {
    console.error(`Error creating user in user table`, error);
    throw error;
  }
}

// export async function anotherFunction()

/*

*/
