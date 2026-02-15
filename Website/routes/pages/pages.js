import { Router } from "express";
import {
  getAboutPage,
  getMentorsPage,
  getWorkshopsPage,
  getWorkshopDetailPage,
} from "../../controllers/pages/pages.controller.js";

const router = Router();

router.get("/about", getAboutPage);
router.get("/mentors", getMentorsPage);
router.get("/workshop", getWorkshopsPage);
router.get("/workshop/:id", getWorkshopDetailPage);

export { router as PagesRouter };
