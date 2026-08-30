import express, { type Request, type Response } from "express";
import cors from "cors";
import session from "express-session";
import { middleware } from "./middlewares/middlewares.js";
import { BarbierroAPIRoutes } from "./apiRoutes.js";
import { requireAuth } from "./controllers/helper/authorizationHandler.js";

const app = express();
const port: string = process.env.PORT || "3000";

// CORS Configuration - Allow only specific origins
const allowedOrigins = [
  process.env.BB_POS_URL || "http://localhost:5173", // POS frontend
  process.env.BB_SUITE_URL || "http://localhost:5174", // Dashboard frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies to be sent
  }),
);

// Session configuration
app.use(
  session({
    secret:
      process.env.SESSION_SECRET || "barbierro-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// BBPos/BBSuite Routes
app.use("/api", BarbierroAPIRoutes());

app.get("/", middleware, (req: Request, res: Response) => {
  res.send("Barbierro API Server - v1.0.0");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on PORT:${port}`);
  console.log(`📍 Allowed origins: ${allowedOrigins.join(", ")}`);
});
