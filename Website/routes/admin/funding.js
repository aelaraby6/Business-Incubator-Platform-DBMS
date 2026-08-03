import { Router } from "express";
import {
    getAllFundingRequests,
    getFundingRequestById,
    createFundingRequest,
    updateFundingStatus,
    deleteFundingRequest
} from "../../controllers/admin/funding.controller.js";

const router = Router();

// URL: /api/admin/funding
router.get("/", getAllFundingRequests);
router.post("/", createFundingRequest);

// URL: /api/admin/funding/:id
router.get("/:id", getFundingRequestById);
router.put("/:id/status", updateFundingStatus); // PUT request to update status
router.delete("/:id", deleteFundingRequest);

export { router as fundingRouter };