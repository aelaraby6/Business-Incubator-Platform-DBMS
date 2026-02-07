import express from "express";
import {
  getAllWorkshops,
  getOneWorkshop,
  attendWorkshop,
  cancelAttendance,
} from "../../controllers/workshop/workshop.controller.js";
import {protect} from "../../middleware/auth.middlware.js"

const router = express.Router();


// Public Routes
router.get("/", getAllWorkshops);
router.get("/:id", getOneWorkshop);

// Protected Routes
router.post("/:id/attend", protect, attendWorkshop);
router.delete("/:id/attend", protect, cancelAttendance);

export default router;
