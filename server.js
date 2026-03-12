import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbConfig/dbConfig.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import authRoute from "./routes/authRoutes.js";
import contactRoute from "./routes/contactRoutes.js";

dotenv.config();

// connect database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/auth", authRoute);
app.use("/api/contacts", contactRoute);

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
 });
