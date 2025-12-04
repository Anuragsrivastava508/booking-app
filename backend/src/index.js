import dotenv from "dotenv";
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  "MONGODB_URI",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "JWT_SECRET",
];

const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error("❌ Missing required environment variables:");
  missingEnvVars.forEach((varName) => {
    console.error(`   - ${varName}`);
  });
  console.error("\nPlease check your .env file and ensure all required variables are set.");
  process.exit(1);
}

// Use JWT_SECRET as fallback for token secrets if not set separately
if (!process.env.ACCESS_TOKEN_SECRET && process.env.JWT_SECRET) {
  process.env.ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
}
if (!process.env.REFRESH_TOKEN_SECRET && process.env.JWT_SECRET) {
  process.env.REFRESH_TOKEN_SECRET = process.env.JWT_SECRET + "_refresh";
}

import app from "./app.js";
import connectDB from "./db/index.js";
const port = process.env.PORT || 5002; //we can pass the path to this, by default will look in the root directory

connectDB()
  .then(
    app.listen(port, () => {
      console.log(`✅ Server running on port: ${port}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
    })
  )
  .catch((err) => {
    console.error("❌ Can't connect to MongoDB!", err);
    process.exit(1);
  });
