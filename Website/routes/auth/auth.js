import { Router } from "express";
import {
  signupPage,
  loginPage,
  profilePage,
  register,
  login,
  logout,
  getBasicUserData,
  updateProfileImage,
  changePassword,
} from "../../controllers/auth/auth.controller.js";
import {
  registerSchema,
  loginSchema,
  updatePasswordSchema,
} from "../../validations/auth/auth.validation.js";
import { validateBody } from "../../utils/validate.js";
import upload from "../../config/multer.js";
import { isAuthenticated } from "../../middleware/auth.middlware.js";

const router = Router();

const uploadProfileImage = (req, res, next) => {
  upload.single("profilePicture")(req, res, (err) => { // تأكد إن الاسم "profilePicture" زي ما في الـ HTML
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
router.get("/profile", isAuthenticated, profilePage);

// Pages Logic
router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

router.post(
  "/profile/upload-picture",
  isAuthenticated,
  uploadProfileImage,
  updateProfileImage
);

router.post(
  "/profile/update-password",
  isAuthenticated,
  // validateBody(updatePasswordSchema),
  changePassword
);

router.get("/me", isAuthenticated, getBasicUserData);

export { router as AuthRouter };