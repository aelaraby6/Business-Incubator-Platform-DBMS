import { Router } from "express";
import { getAboutPage, getMentorsPage } from "../../controllers/pages/pages.controller.js"; 

const router = Router();

router.get("/about", getAboutPage);
router.get("/mentors", getMentorsPage);

export { router as PagesRouter };