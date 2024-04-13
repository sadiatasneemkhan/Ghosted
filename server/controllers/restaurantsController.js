import pool from "../db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function getRestaurantStatusByUserId(id) {
  const [result] = await pool.query(
    `SELECT account_status FROM restaurants WHERE user_id = ?`,
    [id]
  );

  return result[0];
}

export async function getRestaurantId(user_id) {
  const [result] = await pool.query(
    `SELECT restaurant_id FROM restaurants WHERE user_id = ?`,
    [user_id]
  );
  return result[0];
}

export async function getRestaurantByRestId(id) {
  const [rows] = await pool.query(
    `SELECT R.user_id, R.account_status, R.first_name, R.last_name, R.business_name, R.address, R.city, R.province, R.logo, U.email, U.phone FROM restaurants AS R JOIN users AS U ON R.user_id = U.user_id WHERE R.restaurant_id = ?`,
    [id]
  );
  return rows[0]; // Selecting the first row as there should be only one restaurant with the given ID
}

export async function getRestaurantLogoById(id) {
  const [rows] = await pool.query(
    `SELECT logo FROM restaurants WHERE user_id = ?`,
    [id]
  );
  return rows[0];
}

export async function updateRestaurantLogoById(url, id) {
  const [rows] = await pool.query(
    `UPDATE restaurants SET logo = ? WHERE user_id = ?`,
    [url, id]
  );
  console.log[rows];
  return rows[0];
}

export async function getRestaurantByUserId(id) {
  const [rows] = await pool.query(
    `SELECT R.user_id, R.restaurant_id, R.account_status, R.first_name, R.last_name, R.business_name, R.address, R.city, R.province, R.logo, U.email, U.phone FROM restaurants AS R JOIN users AS U ON R.user_id = U.user_id WHERE R.user_id = ?`,
    [id]
  );
  return rows[0]; // Selecting the first row as there should be only one restaurant with the given user ID
}


export async function getRestaurantUserId(id) {
  const [rows] = await pool.query(
    `SELECT user_id FROM restaurants WHERE restaurant_id = ?`,
    [id]
  );
  return rows[0];
}

export async function createRestaurant(
  user_id,
  first_name,
  last_name,
  business_name,
  address,
  city,
  province
) {
  try {
    const [result] = await pool.query(
      `INSERT INTO restaurants (user_id, first_name, last_name, business_name, address, city, province) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, first_name, last_name, business_name, address, city, province]
    );
    const id = result.insertId;
    return getRestaurantByRestId(id);
  } catch (error) {
    console.error(`Error creating user in retaurants table`, error);
    throw error;
  }
}

export async function updateRestaurantByUserId(updateFields, user_id) {
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
        updates.push(`R.${key} = ?`);
        values.push(value);
      }
    }
  }

  if (updates.length === 0) {
    return getRestaurantByUserId(user_id); // No updates
  }

  const query = `
      UPDATE restaurants AS R
      JOIN users AS U ON R.user_id = U.user_id
      SET ${updates.join(", ")}
      WHERE R.user_id = ?
    `;
  values.push(user_id);

  try {
    await pool.query(query, values);
    return getRestaurantByUserId(user_id);
  } catch (error) {
    console.error(
      `Error updating all restaurant through updateRestaurantByUserId`,
      error
    );
    throw error;
  }
}

export async function pauseRestaurant(user_id) {
  await pool.query(
    `UPDATE restaurants SET account_status = "paused" WHERE user_id = ?`,
    [user_id]
  );
  return getRestaurantStatusByUserId(user_id);
}

export async function resumeRestaurant(user_id) {
  await pool.query(
    `UPDATE restaurants SET account_status = "approved" WHERE user_id = ?`,
    [user_id]
  );
  return getRestaurantStatusByUserId(user_id);
}

export async function deleteRestaurant(user_id) {
  try {
    const [result] = await pool.query(
      `UPDATE restaurants AS R JOIN users AS U ON R.user_id = U.user_id SET R.account_status = "deleted", U.email = CONCAT(email, '_deleted_', UNIX_TIMESTAMP()) WHERE R.user_id = ?`,
      [user_id]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllRestaurants() {
  const [rows] = await pool.query(
    `SELECT restaurant_id, account_status, business_name, address, city, province, logo FROM restaurants WHERE account_status = 'approved'`
  );
  return rows;
}

// export async function updateRestaurantNameByUserId(business_name, user_id) {
//   try {
//     await pool.query(
//       `UPDATE restaurants SET business_name = ? WHERE user_id = ?`,
//       [business_name, user_id]
//     );
//     return getRestaurantByUserId(user_id);
//   } catch (error) {
//     console.error(`Error updating restaurant business name`, error);
//     throw error;
//   }
// }

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

// export async function updateCustomerAddressByUserId(
//   address,
//   city,
//   province,
//   user_id
// ) {
//   try {
//     await pool.query(
//       `UPDATE users SET address = ?, city = ?, province = ? WHERE user_id = ?`,
//       [address, city, province, user_id]
//     );
//     return getCustomerByUserId(user_id);
//   } catch (error) {
//     console.error(`Error updating customer address`, error);
//     throw error;
//   }
// }

// export async function updateCustomerPicByUserId(profile_pic, user_id) {
//   try {
//     await pool.query(`UPDATE customers SET profile_pic = ? WHERE user_id = ?`, [
//       profile_pic,
//       user_id,
//     ]);
//     return getCustomerByUserId(user_id);
//   } catch (error) {
//     console.error(`Error updating customer profile pic`, error);
//     throw error;
//   }
// }
