// models/FeaturedCampaigns.js
const mongoose = require("mongoose");

const FeaturedCampaignsSchema = new mongoose.Schema(
  {
    featuredCampaigns: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeaturedCampaigns", FeaturedCampaignsSchema);
