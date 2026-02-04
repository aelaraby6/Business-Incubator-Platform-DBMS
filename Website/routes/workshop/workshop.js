import express from "express";
import {
  getAllWorkshops,
  getOneWorkshop,
  attendWorkshop,
  cancelAttendance,
} from "../../controllers/workshop/workshop.js";

const router = express.Router();

export const protect = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Unauthorized. Please login first." });
  }
  req.user = { 
      id: req.session.userId,
      role: req.session.userRole 
  };
  
  next();
};

// Public Routes
router.get("/", getAllWorkshops);
router.get("/:id", getOneWorkshop);

// Protected Routes
router.post("/:id/attend", protect, attendWorkshop);
router.delete("/:id/attend", protect, cancelAttendance);

export default router;