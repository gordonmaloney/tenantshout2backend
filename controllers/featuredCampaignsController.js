// controllers/featuredCampaignsController.js
const mongoose = require("mongoose");
const FeaturedCampaigns = require("../models/FeaturedCampaigns");

exports.getFeaturedCampaigns = async (req, res) => {
  try {
    let doc = await FeaturedCampaigns.findOne()
      .populate({
        path: "featuredCampaigns",
        // (optional) select only fields you need:
        // select: "campaignId title slug heroImage createdAt"
      })
      .lean();

    // Create the singleton if it doesn't exist
    if (!doc) {
      doc = await FeaturedCampaigns.create({ featuredCampaigns: [] });
      // return the same shape
      return res.json({ ...doc.toObject?.(), featuredCampaigns: [] });
    }

    // doc.featuredCampaigns is now an array of FULL Campaign objects
    res.json(doc);
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

    // optional: validate ObjectIds
    const invalid = featuredCampaigns.filter(
      (id) => !mongoose.isValidObjectId(id)
    );
    if (invalid.length) {
      return res
        .status(400)
        .json({ error: `Invalid ObjectId(s): ${invalid.join(", ")}` });
    }

    const updated = await FeaturedCampaigns.findOneAndUpdate(
      {}, // singleton doc
      { featuredCampaigns },
      { new: true, upsert: true, runValidators: true }
    )
      .populate({
        path: "featuredCampaigns",
        // select: "campaignId title slug heroImage createdAt"
      })
      .lean();

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
