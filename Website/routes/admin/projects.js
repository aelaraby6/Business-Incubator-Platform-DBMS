import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  updateProjectStatus,
  getProjectsByStatus,
  toggleProjectApproved,
  getProjectsStats,
} from "../../controllers/admin/projects.controller.js";
import { isAuth } from "../../middleware/auth.middlware.js";
import { authorizeRole } from "../../middleware/check_roles.middleware.js";

const router = Router();

//router.use(isAuth, authorizeRole("admin"));

router.get("/stats", getProjectsStats);
router.get("/status/:status", getProjectsByStatus);
router.get("/:id", getProjectById);
router.get("/", getAllProjects);
router.put("/:id/status", updateProjectStatus);
router.put("/:id/toggle-approved", toggleProjectApproved);

export default router;

