import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Connect to DB and start server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(
      `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
    );
  });

  // ✅ Handle Uncaught Exceptions (synchronous errors)
  process.on("uncaughtException", (err) => {
    console.error(`❌ Uncaught Exception: ${err.message}`);
    process.exit(1);
  });

  // ✅ Handle Unhandled Promise Rejections (async errors)
  process.on("unhandledRejection", (err) => {
    console.error(`❌ Unhandled Promise Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
});
