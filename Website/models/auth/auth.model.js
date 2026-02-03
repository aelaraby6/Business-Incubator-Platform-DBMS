import pool from "../../config/db.js";

export const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  } catch (err) {
    console.error("Error checking user existence:", err);
    throw err;
  }
};

export const createUser = async ({
  name,
  user_code,
  email,
  password,
  role = "entrepreneur",
}) => {
  try {
    const result = await pool.query(
      `INSERT INTO users(name, user_code, email, password, role)
       VALUES($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, user_code, email, password, role],
    );

    return result.rows[0];
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

export const findUserById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw err;
  }
};

export const updateUserProfileImage = async (userId, imagePath) => {
  try {
    const result = await pool.query(
      `UPDATE users 
       SET profile_image = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [imagePath, userId],
    );

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error updating profile image:", err);
    throw err;
  }
};

export const getUserBasicInfo = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, profile_image, role, created_at, updated_at 
       FROM users WHERE id = $1`,
      [userId],
    );

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error fetching user basic info:", err);
    throw err;
  }
};

export const updateUserPassword = async (userId, newHashedPassword) => {
  try {
    const result = await pool.query(
      `UPDATE users 
       SET password = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id, name, email, profile_image, role, created_at, updated_at`,
      [newHashedPassword, userId],
    );

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error updating password:", err);
    throw err;
  }
};
