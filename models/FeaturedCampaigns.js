const mongoose = require("mongoose");

const FeaturedCampaignsSchema = new mongoose.Schema(
  {
    // store an ordered list of Campaign IDs
    featuredCampaigns: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeaturedCampaigns", FeaturedCampaignsSchema);
