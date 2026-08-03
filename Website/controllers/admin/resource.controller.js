import pool from "../../config/db.js";

// GET ALL RESOURCES
export const getAllResources = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM resources ORDER BY created_at DESC");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET SINGLE RESOURCE BY ID
export const getResourceById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM resources WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Resource not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching resource:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// CREATE A NEW RESOURCE
export const createResource = async (req, res) => {
    try {
        const { name, type, description } = req.body;

        const result = await pool.query(
            `INSERT INTO resources (name, type, description) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
            [name, type, description]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating resource:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// UPDATE A RESOURCE
export const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, description } = req.body;

        const result = await pool.query(
            `UPDATE resources SET name = $1, type = $2, description = $3 
       WHERE id = $4 RETURNING *`,
            [name, type, description, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Resource not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating resource:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// DELETE A RESOURCE
export const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM resources WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Resource not found" });
        }

        res.status(200).json({ message: "Resource deleted successfully" });
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};