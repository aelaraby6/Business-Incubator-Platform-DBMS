import { Router } from "express";
import {
  signupPage,
  loginPage,
  register,
  login,
  logout,
  updateProfileImage,
  getBasicUserData,
  changePassword,
} from "../../controllers/auth/auth.controller.js";
import {
  registerSchema,
  loginSchema,
  updatePasswordSchema,
} from "../../validations/auth/auth.validation.js";
import { validateBody } from "../../utils/validate.js";
import upload from "../../config/multer.js";

const router = Router();

const uploadProfileImage = (req, res, next) => {
  upload.single("profileImage")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "Image size must not exceed 5MB." });
      }
      return res
        .status(400)
        .json({ message: err.message || "File upload failed." });
    }
    next();
  });
};

// Pages
router.get("/signup", signupPage);
router.get("/login", loginPage);

// Pages Logic
router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", logout);

// Profile routes
router.post("/update-profile-image", uploadProfileImage, updateProfileImage);
router.get("/me", getBasicUserData);
router.post(
  "/change-password",
  validateBody(updatePasswordSchema),
  changePassword,
);

export { router as AuthRouter };
