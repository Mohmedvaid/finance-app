import ErrorResponse from "../utils/errorResponse.js";

// Handle Not Found Routes
export const notFound = (req, res, next) => {
  next(new ErrorResponse(`Not Found - ${req.originalUrl}`, 404));
};

// Global Error Handler
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = "Internal Server Error";

  console.error(err);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
