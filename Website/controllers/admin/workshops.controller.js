import pool from "../../config/db.js";

// GET ALL WORKSHOPS
export const getAllWorkshops = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM workshops ORDER BY schedule DESC");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching workshops:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET SINGLE WORKSHOP BY ID
export const getWorkshopById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM workshops WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Workshop not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching workshop:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// CREATE A NEW WORKSHOP
export const createWorkshop = async (req, res) => {
    try {
        const { title, trainer_id, schedule, capacity, category } = req.body;

        const result = await pool.query(
            `INSERT INTO workshops (title, trainer_id, schedule, capacity, category) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
            [title, trainer_id, schedule, capacity, category || 'General']
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating workshop:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// DELETE A WORKSHOP
export const deleteWorkshop = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM workshops WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Workshop not found" });
        }

        res.status(200).json({ message: "Workshop deleted successfully" });
    } catch (error) {
        console.error("Error deleting workshop:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};