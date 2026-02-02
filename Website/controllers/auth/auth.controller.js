import { findUserByEmail, createUser } from "../../models/auth/auth.model.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateUserCode } from "../../utils/helpers.js";

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
