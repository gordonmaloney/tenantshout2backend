const mongoose = require("mongoose");
const FeaturedCampaigns = require("../models/FeaturedCampaigns");

exports.getFeaturedCampaigns = async (req, res) => {
  try {
    const featured = await FeaturedCampaigns.findOne();
    if (!featured) {
      return res.status(404).json({ error: "No featured campaigns found" });
    }
    res.json(featured);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFeaturedCampaigns = async (req, res) => {
  try {
    const { featuredCampaigns } = req.body;

    if (!Array.isArray(featuredCampaigns)) {
      return res
        .status(400)
        .json({ error: "`featuredCampaigns` must be an array" });
    }

    // validate ObjectId format (optional, if you’re storing Campaign IDs)
    const invalid = featuredCampaigns.filter(
      (id) => !mongoose.isValidObjectId(id)
    );
    if (invalid.length) {
      return res
        .status(400)
        .json({ error: `Invalid ObjectId(s): ${invalid.join(", ")}` });
    }

    const updated = await FeaturedCampaigns.findOneAndUpdate(
      {}, // find the singleton doc
      { featuredCampaigns },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
