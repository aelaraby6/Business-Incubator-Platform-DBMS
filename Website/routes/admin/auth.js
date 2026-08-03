import { Router } from "express";
import { adminLogin, adminLogout } from "../../controllers/admin/auth.controller.js";

const router = Router();

// URL: /api/admin/login
router.post("/login", adminLogin);

// URL: /api/admin/logout
router.post("/logout", adminLogout);

export { router as authRouter };