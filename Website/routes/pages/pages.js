import { Router } from "express";
import { getAboutPage, getMentorsPage, getWorkshopsPage } from "../../controllers/pages/pages.controller.js";

const router = Router();

router.get("/about", getAboutPage);
router.get("/mentors", getMentorsPage);
router.get("/workshop", getWorkshopsPage);

export { router as PagesRouter };