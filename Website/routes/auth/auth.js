import { Router } from "express";
import { signupPage, loginPage, register, login, logout } from "../../controllers/auth/auth.controller.js";
import { registerSchema, loginSchema } from "../../validations/auth/auth.validation.js";
import { validateBody } from "../../utils/validate.js";

const router = Router();

// Pages
router.get("/signup", signupPage);
router.get("/login", loginPage);

// Pages Logic
router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", logout);


export { router as AuthRouter };