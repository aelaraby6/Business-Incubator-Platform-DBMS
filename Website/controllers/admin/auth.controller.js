import pool from "../../config/db.js";

// POST /api/admin/login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if email and password were provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 2. Find the user in the database
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = result.rows[0];

        // 3. Check password (Note: This is plain text for now. We will upgrade to bcrypt later!)
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 4. Check if the user has an Admin or Superadmin role
        if (user.role !== "admin" && user.role !== "superadmin") {
            return res.status(403).json({ message: "Access Denied. You are not an admin." });
        }

        // 5. Check if the user is active
        if (user.status !== "active") {
            return res.status(403).json({ message: "Your account is not active." });
        }

        // 6. Save user info in the session!
        req.session.userId = user.id;
        req.session.userRole = user.role;
        req.session.userName = user.name;
        req.session.userEmail = user.email;

        // 7. Send success response
        res.status(200).json({
            message: "Logged in successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// POST /api/admin/logout
export const adminLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Could not log out." });
        }
        res.clearCookie("repodoctor.sid");
        res.status(200).json({ message: "Logged out successfully" });
    });
};