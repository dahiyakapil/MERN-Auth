import dotenv from "dotenv";
import express from "express";
import cors from "cors"; // Added import for cors
import cookieParser from "cookie-parser"; // Added import for cookie-parser
import connectDB from "./db/connectDB.js";
import authRoute from "./routes/authRoute.route.js";

dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = process.env.PORT || 3000;

// Using middleware
app.use(cors());

// Used for POST requests; data will be in JSON format
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(cookieParser());

// Connect to the database
connectDB()
  .then(() => {
    console.log("Database connected successfully");

    // Start the server only after the DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on ----> http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

// Define routes
app.use("/api/auth", authRoute);

