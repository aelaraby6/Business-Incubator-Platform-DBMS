import { authRouter } from "./auth.js";
import { workshopsRouter } from "./workshops.js";
import { fundingRouter } from "./funding.js";
import { Router } from "express";
import { resourcesRouter } from "./resources.js";

import mentorsRouter from "./mentors.js";
import projectsRouter from "./projects.js";
// TODO (next batch): workshops, resources, funding-admin-actions, reports

const router = Router();
router.use("/auth", authRouter);

router.use("/mentors", mentorsRouter);
router.use("/projects", projectsRouter);
router.use("/workshops", workshopsRouter);
router.use("/funding", fundingRouter);
router.use("/resources", resourcesRouter);


export { router as AdminRouter };
