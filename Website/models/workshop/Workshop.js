import pool from "../../config/db.js";

// 1. Get All Workshops
export const getAllWorkshopsQuery = async () => {
  try {
    const result = await pool.query(
      "SELECT * FROM workshops ORDER BY date DESC",
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// 2. Get One Workshop
export const getWorkshopByIdQuery = async (id) => {
  try {
    const query = `
      SELECT 
        w.*, 
        COALESCE(
          json_agg(
            json_build_object('id', u.id, 'name', u.name, 'email', u.email)
          ) FILTER (WHERE u.id IS NOT NULL), 
          '[]'
        ) as attendees
      FROM workshops w
      LEFT JOIN workshop_attendees wa ON w.id = wa.workshop_id
      LEFT JOIN users u ON wa.user_id = u.id
      WHERE w.id = $1
      GROUP BY w.id
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  } catch (err) {
    throw err;
  }
};

// 3. Attend Workshop (Insert into Junction Table)
export const joinWorkshopQuery = async (workshopId, userId) => {
  try {
    const query = `
      INSERT INTO workshop_attendees (workshop_id, user_id)
      VALUES ($1, $2)
      ON CONFLICT (workshop_id, user_id) DO NOTHING
      RETURNING *
    `;
    const result = await pool.query(query, [workshopId, userId]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// 4. Cancel Attendance (Delete from Junction Table)
export const leaveWorkshopQuery = async (workshopId, userId) => {
  try {
    const query = `
      DELETE FROM workshop_attendees 
      WHERE workshop_id = $1 AND user_id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [workshopId, userId]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
