import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = e();

const defaultCorsOrigins = ["http://localhost:3000", "http://localhost:3001"];
const envCorsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : [];
const allowedOrigins = [...new Set([...envCorsOrigins, ...defaultCorsOrigins])].filter(
  Boolean
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        // Allow requests like mobile apps or curl (no origin header)
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn(`CORS blocked request from origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(e.json({ limit: "16kb" }));

app.use(
  //encode the incoming request(like forms)
  e.urlencoded({
    extended: true, //easier to handle complex data
    limit: "16kb",
  })
);

app.use(e.static("public")); //serve static files in the public folder

app.use(cookieParser()); //helps read cookies from the browser

//import routes
import patientRouter from "./routes/patient.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import adminRouter from "./routes/admin.routes.js";
import authRouter from "./routes/auth.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import prescriptionRouter from "./routes/prescription.routes.js";
import vitalsRouter from "./routes/vitals.routes.js";
import medicationLogsRouter from "./routes/medicationLogs.routes.js";
import symptomsRouter from "./routes/symptoms.routes.js";
import adrRouter from "./routes/adr.routes.js";
import notificationRouter from "./routes/notification.routes.js";

//routes
app.use("/api/patients", patientRouter); //routes should always start with /
app.use("/api/notifications", notificationRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/prescriptions", prescriptionRouter);
app.use("/api/vitals", vitalsRouter);
app.use("/api/medicationLogs", medicationLogsRouter);
app.use("/api/symptoms", symptomsRouter);
app.use("/api/adr", adrRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handler middleware (must be last)
import { errorHandler } from "./middlewares/error.middlewares.js";
app.use(errorHandler);

export default app;
