const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const campaignRoutes = require("../routes/campaigns");
const loginRoutes = require("../routes/login");

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

app.use("/campaigns", campaignRoutes);
app.use("/login", loginRoutes);
app.use('/verify', require('../routes/verify'));

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
