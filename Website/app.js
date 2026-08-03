/**
 * @file app.js
 * @description Configures the main Express application, sets up core security/utility middleware, session state store, routing paths, and cron engines.
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectPgSimpleImport from "connect-pg-simple";
import pool from "./config/db.js";
import { GlobalRouter } from "./routes/index.js";
import adminApiRoutes from "./routes/admin-api.js";
import path from "path";
import {
  get404,
  get500,
  get429,
} from "./controllers/error/error.controller.js";
import { initWorkshopJobs } from "./utils/jobs.js";
import "./subscribers/subscribers.js";

const app = express();
const pgSession = connectPgSimpleImport(session);

// Setup view template engine (EJS)
app.set("view engine", "ejs");

// Enable basic security headers via Helmet (with CSP disabled for flexible assets/demos loading)
app.use(helmet({ contentSecurityPolicy: false }));

// Setup HTTP request logger
app.use(morgan("dev"));

// Body parser configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable cross-origin resource sharing
app.use(cors({ origin: true, credentials: true }));

// Serve static assets from 'public/' directory
app.use(express.static("public"));

import { setupMiddleware } from "./middleware/setup.middleware.js";
app.use(setupMiddleware);

/**
 * Configure rate limiter to prevent denial of service (DoS) and brute force attempts.
 * Max 100 requests per 15 minutes window.
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (req, res, next, options) => {
    get429(req, res);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

/**
 * Express Session middleware using PostgreSQL simple storage.
 * Synchronizes session states using the central pg pool.
 */
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    name: "repodoctor.sid",
    cookie: {
      secure: process.env.NODE_ENV === "production", // Enable Secure cookies in production (requires HTTPS)
      httpOnly: true, // Prevent client-side JS access to session cookies
      maxAge: 60 * 60 * 1000, // 1 hour session lifetime
      sameSite: "lax",
    },
    rolling: true, // Reset cookie age limit on every request activity
  }),
);

app.use(flash());

// Inject routes metadata and session parameters into EJS templates rendering context
app.use((req, res, next) => {
  res.locals.routes = {
    signupRoute: "/v1/auth/signup",
    loginRoute: "/v1/auth/login",
    mentors: "/v1/mentors",
    about: "/v1/about",
    workshops: "/v1/workshop",
    projects: "/v1/projects",
    funding: "/v1/funding",
  };
  res.locals.user = req.session?.userId ? { role: req.session.userRole } : null;
  next();
});

// Root Landing Route
app.get("/", (req, res) => {
  res.render("index");
});

// Mount modular global API routes
app.use("/v1", GlobalRouter);
app.use("/api/admin", adminApiRoutes);

app.get("/admin{/*path}", (req, res) => {
  res.sendFile(path.resolve("public/admin/index.html"));
});

// Fallback routes for handling 404 (Not Found) and 500 (Internal Server Error) states
app.use(get404);
app.use(get500);

// Initialize database cron tasks (e.g. tracking workshop schedules and enrollments)
initWorkshopJobs();

export default app;