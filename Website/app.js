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
import workshopRoutes from './routes/workshop/workshop.js';
import { GlobalRouter } from "./routes/index.js";
import { corsOptions } from "./config/corsOptions.js";
import globalErrorHandler from "./middleware/global_error_handler.middleware.js";
import { notFoundMiddleware } from "./middleware/not_found.middleware.js";

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
app.use(cors({
  origin: true,  
  credentials: true
}));

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

app.use(flash());

app.use('/v1/workshops', workshopRoutes);
app.use("/v1", GlobalRouter);


app.use(notFoundMiddleware);

app.use(globalErrorHandler);

export default app;