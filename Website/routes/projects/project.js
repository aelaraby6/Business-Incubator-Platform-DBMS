import { Router } from "express";
import {
  createProjectController,
  newProjectPage,
  projectsController,
  projectDetailController,
} from "../../controllers/project/project.controller.js";
import { isAuth } from "../../middleware/auth.middlware.js";

const router = Router();

router.get("/", projectsController);

router.get("/new", newProjectPage);

router.get("/:id", projectDetailController);

router.post("/create", isAuth, createProjectController);

export default router;
