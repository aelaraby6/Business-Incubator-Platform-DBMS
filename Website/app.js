import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectPgSimpleImport from "connect-pg-simple";
import pool from "./config/db.js";
import { GlobalRouter } from "./routes/index.js";
import { corsOptions } from "./config/corsOptions.js";

const app = express();

const pgSession = connectPgSimpleImport(session);

app.set("view engine", "ejs");

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    routes: {
      signupRoute: "/v1/auth/signup",
      loginRoute: "/v1/auth/login",
    },
  });
});

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
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "lax",
    },
    rolling: true,
  }),
);

app.use("/v1", GlobalRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
