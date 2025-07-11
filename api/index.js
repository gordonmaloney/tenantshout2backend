// index.js (for Vercel serverless deployment)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
require("dotenv").config();

// Route imports (adjust paths if necessary)
const campaignRoutes = require("../routes/campaigns");
const loginRoutes = require("../routes/login");
const verifyRoutes = require("../routes/verify");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// API routes
app.use("/api/campaigns", campaignRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/verify", verifyRoutes);

// Export as a serverless function handler for Vercel
module.exports = serverless(app);
