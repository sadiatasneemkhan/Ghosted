import pool from "../db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

//Prepared statement
export async function getCustomerByCustId(id) {
  const [rows] = await pool.query(
    `SELECT C.user_id, C.first_name, C.last_name, C.address, C.city, C.province, C.profile_pic, U.email, U.phone FROM customers AS C JOIN users AS U ON C.user_id = U.user_id WHERE C.customer_id = ?`,
    [id]
  );
  return rows;
}

export async function getCustomerId(user_id) {
  const [result] = await pool.query(
    `SELECT restaurant_id FROM customers WHERE user_id = ?`,
    [user_id]
  );
  return result[0];
}

export async function getCustomerByUserId(id) {
  const [rows] = await pool.query(
    `SELECT C.user_id, C.first_name, C.last_name, C.address, C.city, C.province, C.profile_pic, U.email, U.phone FROM customers AS C JOIN users AS U ON C.user_id = U.user_id WHERE C.user_id = ?`,
    [id]
  );
  return rows;
}

export async function getCustomerUserId(id) {
  const [rows] = await pool.query(
    `SELECT user_id FROM customers WHERE customer_id = ?`,
    [id]
  );
  return rows[0];
}

export async function createCustomer(
  user_id,
  first_name,
  last_name,
  address,
  city,
  province
) {
  try {
    const [result] = await pool.query(
      `INSERT INTO customers (user_id, first_name, last_name, address, city, province) VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, first_name, last_name, address, city, province]
    );
    const id = result.insertId;
    return getCustomerByCustId(id);
  } catch (error) {
    console.error(`Error creating user in customer table`, error);
    throw error;
  }
}

export async function updateCustomerByUserId(updateFields, user_id) {
  const updates = [];
  const values = [];

  for (const [key, value] of Object.entries(updateFields)) {
    if (value !== undefined) {
      if (key === "password") {
        const hashPassword = await bcrypt.hash(value, saltRounds);
        updates.push(`U.password = ?`);
        values.push(hashPassword);
      } else if (key === "email" || key === "phone") {
        updates.push(`U.${key} = ?`);
        values.push(value);
      } else {
        updates.push(`C.${key} = ?`);
        values.push(value);
      }
    }
  }

  if (updates.length === 0) {
    return getCustomerByUserId(user_id); // No updates
  }

  const query = `
      UPDATE customers AS C
      JOIN users AS U ON C.user_id = U.user_id
      SET ${updates.join(", ")}
      WHERE C.user_id = ?
    `;
  values.push(user_id);

  try {
    await pool.query(query, values);
    return getCustomerByUserId(user_id);
  } catch (error) {
    console.error(
      `Error updating all customer fields through updateCustomerByCustId`,
      error
    );
    throw error;
  }
}

/*
export async function updateCustomerNameByUserId(
  first_name,
  last_name,
  user_id
) {
  try {
    await pool.query(
      `UPDATE customers SET first_name = ?, last_name = ? WHERE user_id = ?`,
      [first_name, last_name, user_id]
    );
    return getCustomerByUserId(user_id);
  } catch (error) {
    console.error(`Error updating customer name`, error);
    throw error;
  }
}
*/

// export async function updateCustomerPhoneByUserId(phone, user_id) {
//   try {
//     await pool.query(`UPDATE users SET phone = ? WHERE user_id = ?`, [
//       phone,
//       user_id,
//     ]);
//     return getCustomerByUserId(user_id);
//   } catch (error) {
//     console.error(`Error updating customer phone number`, error);
//     throw error;
//   }
// }

// export async function updateCustomerEmailByUserId(email, user_id) {
//   try {
//     await pool.query(`UPDATE users SET email = ? WHERE user_id = ?`, [
//       email,
//       user_id,
//     ]);
//     return getCustomerByUserId(user_id);
//   } catch (error) {
//     console.error(`Error updating customer email`, error);
//     throw error;
//   }
// }

// not really needed

// export async function updateCustomerPasswordByUserId(password, user_id) {
//   try {
//     const hashPassword = await bcrypt.hash(password, saltRounds);

//     await pool.query(`UPDATE users SET password = ? WHERE user_id = ?`, [
//       hashPassword,
//       user_id,
//     ]);
//   } catch (error) {
//     console.error(`Error updating customer password`, error);
//     throw error;
//   }
// }

/*
export async function updateCustomerAddressByUserId(
  address,
  city,
  province,
  user_id
) {
  try {
    await pool.query(
      `UPDATE users SET address = ?, city = ?, province = ? WHERE user_id = ?`,
      [address, city, province, user_id]
    );
    return getCustomerByUserId(user_id);
  } catch (error) {
    console.error(`Error updating customer address`, error);
    throw error;
  }
}
*/

export async function updateCustomerPicByUserId(profile_pic, user_id) {
  try {
    await pool.query(`UPDATE customers SET profile_pic = ? WHERE user_id = ?`, [
      profile_pic,
      user_id,
    ]);
    return getCustomerByUserId(user_id);
  } catch (error) {
    console.error(`Error updating customer profile pic`, error);
    throw error;
  }
}

export async function getCustomerPicByUserId(user_id) {
  try {
    await pool.query(`SELECT profile_pic FROM customers WHERE user_id = ?`, [
      user_id,
    ]);
    return getCustomerByUserId(user_id);
  } catch (error) {
    console.error(`Error getting customer profile pic`, error);
    throw error;
  }
}
