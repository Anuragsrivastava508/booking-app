import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Handle different error types
  if (!(error instanceof ApiError)) {
    // Mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map((e) => e.message);
      error = new ApiError(400, "Validation Error", messages, error.stack);
    }
    // Mongoose cast errors (invalid ObjectId, etc.)
    else if (error instanceof mongoose.Error.CastError) {
      error = new ApiError(400, `Invalid ${error.path}: ${error.value}`, [], error.stack);
    }
    // JWT errors
    else if (error.name === "JsonWebTokenError") {
      error = new ApiError(401, "Invalid token", [], error.stack);
    } else if (error.name === "TokenExpiredError") {
      error = new ApiError(401, "Token expired", [], error.stack);
    }
    // Multer errors (file upload)
    else if (error.name === "MulterError") {
      error = new ApiError(400, `File upload error: ${error.message}`, [], error.stack);
    }
    // Default error handling
    else {
      const statusCode = error.statusCode || error.status || 500;
      const message = error.message || "Something went wrong";
      error = new ApiError(statusCode, message, error?.errors || [], error.stack);
    }
  }

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", {
      message: error.message,
      statusCode: error.statusCode,
      stack: error.stack,
      path: req.path,
      method: req.method,
    });
  }

  // Send error response
  const response = {
    success: false,
    message: error.message,
    ...(error.errors && error.errors.length > 0 && { errors: error.errors }),
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  res.status(error.statusCode || 500).json(response);
};

export { errorHandler };
