import pool from "../../config/db.js";

/**
 * Find a user record by their email address.
 * @async
 * @function findUserByEmail
 * @param {string} email - The email address to look up.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 * @throws {Error} If the query fails.
 */
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

/**
 * Create a new user record in the database.
 * @async
 * @function createUser
 * @param {Object} userData - User registration data.
 * @param {string} userData.name - User's full name.
 * @param {string} userData.user_code - Generated unique user alphanumeric code.
 * @param {string} userData.email - User's email address.
 * @param {string} userData.password - Hashed password.
 * @param {string} [userData.role="entrepreneur"] - Role assigned to the user (e.g. 'entrepreneur', 'mentor', 'investor').
 * @returns {Promise<Object>} The newly created user record.
 * @throws {Error} If insert query fails.
 */
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

/**
 * Retrieve a user record by their numeric ID.
 * @async
 * @function findUserById
 * @param {number|string} id - User ID.
 * @returns {Promise<Object|null>} The user object if found, otherwise null.
 * @throws {Error} If query fails.
 */
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

/**
 * Update the profile image file path for a user.
 * @async
 * @function updateUserProfileImage
 * @param {number|string} userId - User ID.
 * @param {string} imagePath - File path to the uploaded image.
 * @returns {Promise<Object>} The updated user record.
 * @throws {Error} If user does not exist or query fails.
 */
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

/**
 * Get basic public information of a user.
 * Excludes sensitive data like hashed passwords.
 * @async
 * @function getUserBasicInfo
 * @param {number|string} userId - User ID.
 * @returns {Promise<Object>} User information object.
 * @throws {Error} If user not found.
 */
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

/**
 * Update a user's hashed password.
 * @async
 * @function updateUserPassword
 * @param {number|string} userId - User ID.
 * @param {string} newHashedPassword - The new hashed password string.
 * @returns {Promise<Object>} User details (excluding password) after updates.
 * @throws {Error} If user not found.
 */
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

/**
 * Retrieve notifications of a specific user.
 * Ordered by creation timestamp descending.
 * @async
 * @function getUserNotifications
 * @param {number|string} userId - User ID.
 * @returns {Promise<Array<Object>>} List of notifications.
 * @throws {Error} If database selection fails.
 */
export const getUserNotifications = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT id, type, message, read, created_at 
       FROM notifications 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  } catch (err) {
    console.error("Error fetching user notifications:", err);
    throw err;
  }
};

/**
 * Mark all unread notifications of a user as read.
 * @async
 * @function markNotificationsAsRead
 * @param {number|string} userId - User ID.
 * @returns {Promise<void>} Resolves on query completion.
 * @throws {Error} If update fails.
 */
export const markNotificationsAsRead = async (userId) => {
  try {
    await pool.query(
      `UPDATE notifications 
       SET read = true 
       WHERE user_id = $1 AND read = false`,
      [userId]
    );
  } catch (err) {
    console.error("Error marking notifications as read:", err);
    throw err;
  }
};

/**
 * Insert a new notification alert for a user.
 * @async
 * @function createNotification
 * @param {number|string} userId - Target User ID.
 * @param {string} type - Alert category/type (e.g. 'workshops', 'funding').
 * @param {string} message - Text notification message.
 * @returns {Promise<Object>} The created notification record.
 * @throws {Error} If insertion fails.
 */
export const createNotification = async (userId, type, message) => {
  try {
    const result = await pool.query(
      `INSERT INTO notifications (user_id, type, message, read, created_at)
       VALUES ($1, $2, $3, false, NOW())
       RETURNING *`,
      [userId, type, message]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error creating notification:", err);
    throw err;
  }
};

