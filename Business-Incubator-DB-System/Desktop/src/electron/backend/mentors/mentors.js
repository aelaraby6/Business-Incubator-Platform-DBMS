import pool from '../../config/database.js';

// Get All Mentors with Counts 
export const getAllMentors = async () => {
  const res = await pool.query(`
    SELECT m.*, 
    (SELECT COUNT(*) FROM mentor_project_assignments mp WHERE mp.mentor_id = m.id) as projects_count,
    (SELECT COUNT(*) FROM mentor_workshop_assignments mw WHERE mw.mentor_id = m.id) as workshops_count
    FROM mentors m
    ORDER BY m.created_at DESC
  `);
  return res.rows;
};

// Add New Mentor
export const addMentor = async (data) => {
  const { name, email, expertise, phone, status } = data;
  const res = await pool.query(
    'INSERT INTO mentors (name, email, expertise, phone, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, email, expertise, phone, status || 'active']
  );
  return res.rows[0];
};

// Delete Mentor
export const deleteMentor = async (id) => {
  await pool.query('DELETE FROM mentors WHERE id = $1', [id]);
  return { success: true };
};

// (Optional) Assign Mentor to Workshop
export const assignMentorToWorkshop = async (mentorId, workshopId) => {
  await pool.query(
    'INSERT INTO mentor_workshop_assignments (mentor_id, workshop_id) VALUES ($1, $2)',
    [mentorId, workshopId]
  );
  return { success: true };
};