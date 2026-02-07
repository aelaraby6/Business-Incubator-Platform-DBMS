import { Router } from "express";
import { AuthRouter } from "./auth/auth.js";
import { PagesRouter } from "./pages/pages.js";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/", PagesRouter);

export { router as GlobalRouter };
