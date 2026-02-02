import pool from "../../config/db.js";

export const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  } catch (err) {
    console.error("Error checking user existence:", err);
    throw err;
  }
};

export const createUser = async ({ name, user_code, email, password, role = "entrepreneur" }) => {
  try {
   
    const result = await pool.query(
      `INSERT INTO users(name, user_code, email, password, role)
       VALUES($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, user_code, email, password, role]
    );

    return result.rows[0]; 
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};
