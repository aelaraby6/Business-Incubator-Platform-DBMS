import {
  findUserByEmail,
  createUser,
  findUserById,
  updateUserProfileImage,
  getUserBasicInfo,
  updateUserPassword,
} from "../../models/auth/auth.model.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateUserCode } from "../../utils/helpers.js";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

export const signupPage = (req, res) =>
  res.render("auth/signup", {
    routes: {
      signupRoute: "/v1/auth/signup",
      loginRoute: "/v1/auth/login",
    },
    pageRoute: "/v1/auth/signup",
  });

export const loginPage = (req, res) =>
  res.render("auth/login", {
    routes: {
      signupRoute: "/v1/auth/signup",
      loginRoute: "/v1/auth/login",
    },
    pageRoute: "/v1/auth/login",
  });

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await findUserByEmail(email);

    if (user) {
      throw new Error("user already exists");
    }

    const hashedPassword = await hashPassword(password);

    let user_code = generateUserCode();

    const newUser = await createUser({
      name,
      user_code,
      email,
      password: hashedPassword,
    });

    // res.redirect("/auth/login");

    res.json({ message: "User registered successfully!" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    req.session.userId = user.id;
    req.session.userRole = user.role;

    // res.redirect("profile");

    res.json({ message: "User Login In successfully!" });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      res.clearCookie("repodoctor.sid");

      res.json({ message: "User logged out successfully!" });

      // res.redirect("/auth/login");
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfileImage = async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.session.userId) {
      return res
        .status(401)
        .json({ message: "User not authenticated. Please login first." });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }

    // Validate file size (already checked by multer, but extra validation)
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxFileSize) {
      // Delete the uploaded file if it exceeds size
      await fs.unlink(req.file.path);
      return res
        .status(400)
        .json({ message: "Image size must not exceed 5MB." });
    }

    // Get user
    const user = await findUserById(req.session.userId);
    if (!user) {
      await fs.unlink(req.file.path);
      return res.status(404).json({ message: "User not found." });
    }

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const processedImageDir = path.join(
      __dirname,
      "../../public/uploads/profile-images",
    );
    const processedImagePath = path.join(
      processedImageDir,
      `profile-${req.session.userId}-processed.jpg`,
    );

    // Process image with sharp (compress and optimize)
    await sharp(req.file.path)
      .resize(200, 200, {
        fit: "cover",
        position: "center",
      })
      .jpeg({ quality: 80, progressive: true })
      .toFile(processedImagePath);

    // Delete original uploaded file
    await fs.unlink(req.file.path);

    // Delete old profile image if it exists
    if (user.profile_image) {
      try {
        const oldImagePath = path.join(
          __dirname,
          "../../public",
          user.profile_image,
        );
        await fs.unlink(oldImagePath);
      } catch (err) {
        console.warn("Could not delete old profile image:", err.message);
      }
    }

    // Save image path in database
    const imagePath = `/uploads/profile-images/profile-${req.session.userId}-processed.jpg`;
    const updatedUser = await updateUserProfileImage(
      req.session.userId,
      imagePath,
    );

    res.json({
      message: "Profile image updated successfully!",
      imageUrl: imagePath,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        profile_image: updatedUser.profile_image,
      },
    });
  } catch (err) {
    // Clean up uploaded file if error occurs
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (e) {
        console.warn("Could not delete uploaded file:", e.message);
      }
    }
    next(err);
  }
};

export const getBasicUserData = async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.session.userId) {
      return res
        .status(401)
        .json({ message: "User not authenticated. Please login first." });
    }

    // Get user basic info
    const user = await getUserBasicInfo(req.session.userId);

    res.json({
      message: "User data retrieved successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_image: user.profile_image,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.session.userId) {
      return res
        .status(401)
        .json({ message: "User not authenticated. Please login first." });
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate that newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirmation do not match." });
    }

    // Get user from database
    const user = await findUserById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify current password
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    // Check if new password is same as old password
    const isSameAsOld = await comparePassword(newPassword, user.password);
    if (isSameAsOld) {
      return res.status(400).json({
        message: "New password must be different from current password.",
      });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password in database
    const updatedUser = await updateUserPassword(
      req.session.userId,
      hashedPassword,
    );

    res.json({
      message: "Password changed successfully!",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
