// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const rateLimit = require("express-rate-limit");      // ← add this
require("dotenv").config();

// Route imports
const campaignRoutes = require("../routes/campaigns");
const loginRoutes = require("../routes/login");
const verifyRoutes = require("../routes/verify");

const app = express();

// apply rate-limit to /campaigns
const campaignsLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,   // 15 minutes
  max: 100,                   // limit each IP to 100 requests per window
  standardHeaders: true,      // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,       // Disable the `X-RateLimit-*` headers
  message: {
    error: "Too many requests to /campaigns, please try again later."
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: "50kb" }));
app.use(bodyParser.json());

// MongoDB connection…
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("✅ Connected to MongoDB"));

// API routes
app.get("/", (req, res) => res.send("Express on Vercel"));

// attach the limiter *before* your campaign routes
app.use("/campaigns", campaignsLimiter, campaignRoutes);

// optional: different limits for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts, please wait 15 minutes." }
});
app.use("/login", loginLimiter, loginRoutes);

app.use("/verify", verifyRoutes);

module.exports = app;
