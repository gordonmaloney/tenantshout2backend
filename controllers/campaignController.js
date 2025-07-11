const Campaign = require("../models/Campaign");

exports.getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find();
  res.json(campaigns);
};

exports.getCampaignById = async (req, res) => {
  const campaign = await Campaign.findOne({ campaignId: req.params.id });
  if (!campaign) return res.status(404).json({ error: "Campaign not found" });
  res.json(campaign);
};

exports.createCampaign = async (req, res) => {
  console.log(req.body)
  try {
    const newCampaign = new Campaign(req.body);
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const updated = await Campaign.findOneAndUpdate(
      { campaignId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Campaign not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  const deleted = await Campaign.findOneAndDelete({ campaignId: req.params.id });
  if (!deleted) return res.status(404).json({ error: "Campaign not found" });
  res.json({ success: true });
};
