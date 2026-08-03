import { Router } from "express";
import {
    getAllResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource
} from "../../controllers/admin/resource.controller.js";

const router = Router();

// URL: /api/admin/resources
router.get("/", getAllResources);
router.post("/", createResource);

// URL: /api/admin/resources/:id
router.get("/:id", getResourceById);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);

export { router as resourcesRouter };