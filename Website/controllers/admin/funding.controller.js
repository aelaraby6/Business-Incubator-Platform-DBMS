import pool from "../../config/db.js";

// GET ALL FUNDING REQUESTS
export const getAllFundingRequests = async (req, res) => {
    try {
        // We join with projects and users to get names instead of just IDs
        const result = await pool.query(`
      SELECT fr.*, p.name as project_name, u.name as investor_name 
      FROM funding_requests fr
      LEFT JOIN projects p ON fr.project_id = p.id
      LEFT JOIN users u ON fr.investor_id = u.id
      ORDER BY fr.created_at DESC
    `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching funding requests:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET SINGLE FUNDING REQUEST BY ID
export const getFundingRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM funding_requests WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Funding request not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching funding request:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// CREATE A NEW FUNDING REQUEST
export const createFundingRequest = async (req, res) => {
    try {
        const { project_id, investor_id, amount, status } = req.body;

        const result = await pool.query(
            `INSERT INTO funding_requests (project_id, investor_id, amount, status) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
            [project_id, investor_id, amount, status || 'Pending']
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating funding request:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// UPDATE FUNDING STATUS (Approve/Reject)
export const updateFundingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // Expecting "Approved", "Rejected", or "Pending"

        const result = await pool.query(
            "UPDATE funding_requests SET status = $1, updated_at = now() WHERE id = $2 RETURNING *",
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Funding request not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating funding status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// DELETE A FUNDING REQUEST
export const deleteFundingRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM funding_requests WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Funding request not found" });
        }

        res.status(200).json({ message: "Funding request deleted successfully" });
    } catch (error) {
        console.error("Error deleting funding request:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};