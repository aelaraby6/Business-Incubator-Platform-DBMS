import { Router } from "express";
import {
    getAllWorkshops,
    getWorkshopById,
    createWorkshop,
    deleteWorkshop
} from "../../controllers/admin/workshops.controller.js";

const router = Router();

// URL: /api/admin/workshops
router.get("/", getAllWorkshops);
router.post("/", createWorkshop);

// URL: /api/admin/workshops/:id
router.get("/:id", getWorkshopById);
router.delete("/:id", deleteWorkshop);

export { router as workshopsRouter };